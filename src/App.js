import './App.css'
import './lib/timeline/timeline.css'
import './lib/timeline/timeline.js'
import { useState, useRef, useEffect, useCallback } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useLocation } from "react-router-dom"

import events from './events.js'

import _ from 'lodash'

import {
  Box,
  ButtonBase,
  InputAdornment,
  OutlinedInput,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Popover,
  Grow,
  Chip,
  IconButton,
  Tooltip,
  Dialog
} from '@mui/material'

const HEADER_HEIGHT = 16


function Caption({ icon, name, url }) {
  return (
    <ButtonBase style={{
      background: 'white',
      position: 'absolute',
      bottom: 10,
      left: 10,
      display: 'inline-flex',
      borderRadius: 8,
    }}>
      <Box className={"caption"} onClick={() => {
        window.open(url, '_blank')
      }} on boxShadow={2} style={{
        background: '#2c3e50',
        padding: '6px 8px',
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 8,
        color: 'white',
        fontWeight: "bold",
        fontFamily: "'Montserrat'",
        fontWeight: 500,
        zIndex: 1000
      }}>
        <img src={icon} style={{
          marginRight: 6,
          height: 16
        }} />
        {name}
      </Box>
    </ButtonBase>
  )
}

function App() {
  const contentRef = useRef(null)
  const timelineRef = useRef(null)
  const wikipediaRef = useRef(null)
  const geacronRef = useRef(null)

  const [datas, setDatas] = useState({
    events,
    eras: [
      {
        start_date: { year: -3000 },
        end_date: 476,
        text: {
          headline: 'Antiquité',
        }
      },
      {
        start_date: { year: 476 },
        end_date: { year: 1453 },
        text: {
          headline: 'Moyen Âge',
        }
      },
      {
        start_date: { year: 1453 },
        end_date: { year: 1789 },
        text: {
          headline: 'Époque moderne'
        }
      },
      {
        start_date: { year: 1789 },
        end_date: { year: 2022 },
        text: {
          headline: 'Époque contemporaine',
        }
      },
    ]
  })

  const [page, setPage] = useState({})
  const [year, setYear] = useState(0)
  const [mapYear, setMapYear] = useState(null)

  const [mapOpen, setMapOpen] = useState(localStorage.getItem('isMap') || false)
  const [periods, setPeriods] = useState([])
  const [timeline, setTimeline] = useState(false)

  useEffect(() => {
    if (mapOpen) {
      localStorage.setItem('isMap', 1)
    } else {
      localStorage.removeItem('isMap')
    }
  }, [mapOpen])

  const timelineOptions = {
    debug: true,
    start_at_slide: '0',
    hash_bookmark: true,
  }


  useEffect(() => {
    let event = datas.events.find(event => `#event-${event.unique_id}` === window.location.hash)

    if (!!event) {
      setPage(event)
      setYear(event.year)
      setMapYear(event.year)
    } else {
      setPage(datas.events[0])
      setYear(datas.events[0].year)
      setMapYear(datas.events[0].year)
    }

    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply: (target, thisArg, argArray) => {
        let event = datas.events.find(event => `#event-${event.unique_id}` === argArray[2])
        if (!!event) {
          setPage(event)
          setYear(event.year)
          iframeYear(event.year)
        }
        return target.apply(thisArg, argArray)
      },
    })
  }, [])

  const iframeYearD = _.debounce(function (newYear) {
    if (!isNaN(newYear) && newYear !== 0) {
      iframeYear(newYear)
    }
  }, 1000);

  const iframeYear = (year) => {
    if (geacronRef.current) {
      geacronRef.current.contentWindow.postMessage({ year }, '*')
    }
  }

  useEffect(() => {
    if (!timeline && timelineRef.current) {
      setTimeline(new window.TL.Timeline('timeline', datas, timelineOptions))
    }
  }, [timelineRef.current])

  return (
    <Box className="App">
      <Box style={{
        background: "rgb(141 141 141 / 20%)",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }} />

      <Box id="content" ref={contentRef} style={{
        zIndex: 2022,
        width: '100vw',
        transition: 'all ease-in 0.2s',
        padding: HEADER_HEIGHT + 'px 42px 16px 42px',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box
          boxShadow={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 8,
            flexGrow: 1
          }}
        >
          <Box id="content-inner" style={{
            borderRadius: '8px 8px 0px 0px',
            overflow: 'hidden',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
          }}>
            <Box
              style={{
                color: 'white',
                transition: 'all ease-in  0.3s',
                background: '#2c3e50',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                padding: '10px 16px 10px 24px',
              }}
            >
              <Box style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    marginRight: 10,
                    fontSize: 17,
                    fontWeight: 500
                  }}>
                    {page.title}
                  </span>
                  {/* <Chip size={"small"} variant={"outlined"} label={"France"} style={{ marginLeft: 6, color: 'white' }} /> */}
                </span>
              </Box>
              <Box style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <>
                  <Button style={{
                    height: "36px",
                    marginRight: "6px",
                    width: 140,
                    justifyContent: 'space-between',
                    backgroundColor: mapOpen ? 'white' : "#2c3e50",
                    borderColor: mapOpen ? 'white' : "white",
                    color: mapOpen ? '#2c3e50' : "white",
                    textTransform: 'none',
                    fontSize: mapOpen ? 14 : 16
                  }} variant="outlined" disabled={isNaN(year)} onClick={() => setMapOpen(!mapOpen)} startIcon={<i style={{
                    marginRight: 16
                  }} className={mapOpen ? 'fa-solid fa-book' : `fa-solid fa-location-pin`}></i>}>
                    {mapOpen ? 'Histoire' : 'Carte'}
                  </Button>
                  <OutlinedInput
                    style={{
                      color: 'white',
                      height: "36px",
                      width: "120px",
                      fontWeight: "bold",
                      fontFamily: "'Montserrat'"
                    }}
                    value={year}
                    onChange={(e) => {
                      let newYear = isNaN(e.target.value) || ['-', '0'].includes(e.target.value) ? year : e.target.value
                      setYear(newYear)
                      iframeYearD(newYear)
                    }}
                    endAdornment={<InputAdornment style={{ position: 'relative', top: 1, color: 'white' }} position="end">{year > 0 ? 'ACE' : 'BCE'}</InputAdornment>}
                  />
                </>

              </Box>
            </Box>

            <Box
              style={{
                color: 'white',
                background: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                flexGrow: 1,
                color: '#2c3e50',
              }}
            >

              {<Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  overflow: 'hidden',
                  height: '100%',
                  backgroundColor: 'white',
                  width: '100%',
                  display: mapOpen ? 'block' : 'none',
                }}
              >
                <iframe ref={geacronRef} style={{ overflow: 'hidden', border: 'none', width: '100%', height: '100%' }} src={`/geacron?year=${mapYear}`} />
                {mapOpen && <Caption icon={'http://geacron.com/wp-content/themes/atahualpa/images/favicon/geacron.ico'} name={'Geacron'} url={'http://geacron.com/'} />}
              </Box>}

              {<Box
                style={{
                  overflow: 'hidden',
                  height: '100%',
                  width: '100%'
                }}
              >
                <iframe id="wikipedia" style={{ overflow: 'hidden', border: 'none', width: '100%', height: '100%' }} src={`/wiki?url=${page.url}`} />
                {!mapOpen && <Caption icon={'https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg'} name={'Wikipedia'} url={'https://fr.wikipedia.org/'} />}
              </Box>}
            </Box>
          </Box>

          <Box
            style={{
              height: 300,
              borderRadius: '0px 0px 8px 8px',
              overflow: 'hidden',
              background: '#2c3e50',
              position: 'relative',
              boxShdadow: 'inset 5px 19px 18px -8px rgba(0,0,0,0.51)'
            }}
          >
            <Box id="timeline" boxShadow={1} ref={timelineRef} style={{
              borderRadius: '0px 0px 8px 8px',
              overflow: 'hidden',
              width: '100%'
            }}>
            </Box>
            <Caption icon={'https://theme.zdassets.com/theme_assets/352545/7a5f22e307cf630bd4583af57f93c14858858925.png'} name={'Knight Lab'} url={'http://timeline.knightlab.com/'} />
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default App