import './App.css'
import './lib/timeline/timeline.css'
import './lib/timeline/timeline.js'
import { useState, useRef, useEffect, useMemo } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'

import axios from 'axios'

import _ from 'lodash'

import {
  Box,
  ButtonBase,
  InputAdornment,
  OutlinedInput,
  Button,
  Popover,
  Fade,
  IconButton,
  Tooltip,
  CircularProgress,
  darken
} from '@mui/material'

const eras = [
  {
    start_date: { year: -3000 },
    end_date: { year: 476 },
    end_year: 476,
    start_year: -3000,
    color: '#f39c12',
    text: {
      headline: 'Antiquité',
    }
  },
  {
    start_date: { year: 476 },
    end_date: { year: 1453 },
    end_year: 1453,
    start_year: 476,
    color: '#3498db',
    text: {
      headline: 'Moyen Âge',
    }
  },
  {
    start_date: { year: 1453 },
    end_date: { year: 1789 },
    end_year: 1789,
    start_year: 1453,
    color: '#c0392b',
    text: {
      headline: 'Époque moderne'
    }
  },
  {
    start_date: { year: 1789 },
    end_date: { year: 2023 },
    end_year: 2023,
    start_year: 1789,
    color: '#27ae60',
    text: {
      headline: 'Époque contemporaine',
    }
  },
]

const API_URL = (window.document.domain.includes('localhost') ? 'http://localhost:80' : '/')

function App() {
  const timelineRef = useRef(null)
  const geacronRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [datas, setDatas] = useState(null)

  const [page, setPage] = useState({})
  const [year, setYear] = useState(0)
  const [mapYear, setMapYear] = useState(null)

  const [timeline, setTimeline] = useState(false)

  const timelineOptions = {
    debug: true,
    start_at_slide: 0,
    initial_zoom: 4,
    hash_bookmark: true,
  }

  const era = useMemo(() => eras.find(era_ => year >= era_.start_year && year <= era_.end_year), [year])

  useEffect(() => {
    axios.get(API_URL + '/periods').then(res => {
      let _datas = {
        eras,
        events: res.data.reduce((a, b) => [...a, ...b.events.map(event => ({ ...event }))], []).map((e, i) => ({
          ...e,
          text: {
            headline: e.title
          },
          unique_id: string_to_slug(e.title),
          start_date: { year: e.year }
        })),
      }
      console.log(_datas)
      setDatas(_datas)

      let event = _datas.events.find(event => `#event-${string_to_slug(event.title)}` === window.location.hash)

      if (!event) {
        event = _datas.events[0]
        window.history.replaceState(null, null, `#event-${string_to_slug(event.title)}`)
      }

      setPage(event)
      setYear(event.year)
      setMapYear(event.year)

      window.history.replaceState = new Proxy(window.history.replaceState, {
        apply: (target, thisArg, argArray) => {
          let event = _datas.events.find(event => `#event-${string_to_slug(event.title)}` === argArray[2])
          if (!!event) {
            setPage(event)
            setYear(event.year)
            iframeYear(event.year)
          }
          return target.apply(thisArg, argArray)
        },
      })
    });
  }, [])

  useEffect(() => {
    setLoading(true)
  }, [page])



  useEffect(() => {
    if (!timeline && timelineRef.current) {
      let _timeline = new window.TL.Timeline('timeline', datas, timelineOptions)
      setTimeline(_timeline)

      // const handleZoom = (e) => {
      //   if (e.deltaY < 0) {
      //     _timeline.zoomIn()
      //   } else if (e.deltaY > 0) {
      //     _timeline.zoomOut()
      //   }
      // };

      // const myDiv = timelineRef.current;
      // myDiv.addEventListener('wheel', handleZoom);
      // return () => {
      //   myDiv.removeEventListener('wheel', handleZoom);
      // };
    }
  }, [timelineRef.current])

  const iframeYear = (newYear = null) => {
    const yearToSet = newYear === null ? year : newYear
    if (!isNaN(yearToSet) && yearToSet !== 0 && geacronRef.current) {
      geacronRef.current.contentWindow.postMessage({ year: yearToSet }, '*')
    }
  }

  const control = (value) => {
    setYear(year + value)
    iframeYear()
  }

  return (
    datas === null ? <Box></Box> : <Box className="App">
      <Box style={{
        zIndex: 2022,
        width: '100vw',
        transition: 'all ease-in 0.2s',
        padding: '10px',
        background: '#2c3e50',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box
          boxShadow={0}
          style={{
            overflow: 'hidden',
            border: '2px solid ' + darken(era.color, 0.2),
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            flexGrow: 1
          }}
        >
          <Header control={control} era={era} page={page} year={year} iframeYear={iframeYear} setYear={setYear} />

          <Box style={{ flexGrow: 1, position: 'relative', display: 'flex' }}>
            <Wikipedia era={era} page={page} loading={loading} setLoading={setLoading} />
            <Map mapYear={mapYear} geacronRef={geacronRef} />
          </Box>

          <Timeline timelineRef={timelineRef} />
        </Box>
      </Box>
    </Box>
  )
}

function Map({ geacronRef, mapYear }) {
  return <Fade in>
    <Box
      style={{
        overflow: 'hidden',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
        width: '40%',
        display: 'block',
      }}
    >
      <iframe ref={geacronRef} style={{ overflow: 'hidden', border: 'none', width: '100%', height: '100%' }} src={`${API_URL}/geacron/geacron.html?year=${mapYear}`} />
      {<Caption icon={'http://geacron.com/wp-content/themes/atahualpa/images/favicon/geacron.ico'} name={'Geacron'} url={'http://geacron.com/'} />}
    </Box>
  </Fade>
}

function Wikipedia({ page, era, loading, setLoading }) {
  return <>
    <Box
      style={{
        overflow: 'hidden',
        height: '100%',
        position: 'relative',
        width: '60%',
        borderRight: '2px solid #e0e0e0',
      }}
    >
      <Fade in={loading}>
        <Box style={{
          background: 'white',
          overflow: 'hidden',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={100} style={{ 'color': era.color }} />
            <span style={{
              fontWeight: '500',
              marginTop: '34px',
              fontSize: '20px',
              color: era.color,
              display: 'flex'
            }}>
              Chargement de l'Histoire...
            </span>
          </Box>
        </Box>
      </Fade>
      <iframe onLoad={() => setLoading(false)} id="wikipedia" style={{ overflow: 'hidden', border: 'none', width: '100%', height: '100%' }} src={`${API_URL}/wiki?url=${page.url}&color=${era.color.slice(1)}`} />
      {<Caption icon={'https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg'} name={'Wikipedia'} url={'https://fr.wikipedia.org/'} />}
    </Box>
  </>
}

function Timeline({ timelineRef }) {
  return <Fade in>
    <Box
      style={{
        borderTop: '2px solid #e0e0e0',
        height: '284px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Menu />
      <Box
        id="timeline"
        ref={timelineRef}
        style={{
          overflow: 'hidden',
          height: '100%',
          width: '100%'
        }}
      />
      <Caption icon={'https://theme.zdassets.com/theme_assets/352545/7a5f22e307cf630bd4583af57f93c14858858925.png'} name={'Knight Lab'} url={'http://timeline.knightlab.com/'} />
    </Box>
  </Fade>
}

function Caption({ icon, name, url }) {
  return (
    <ButtonBase style={{
      background: 'white',
      position: 'absolute',
      bottom: 10,
      right: 10,
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

function Header({ page, year, iframeYear, setYear, era, control }) {
  return <Box
    style={{
      transition: 'all ease-in  0.3s',
      background: era?.color,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      borderBottom: '2px solid ' + darken(era.color, 0.2),
      justifyContent: 'space-between',
      padding: '8px 16px 8px 24px',
    }}
  >
    <Box style={{
      display: 'flex',
      flexDirection: 'column',
      color: 'white'
    }}>
      <span style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <span style={{
          marginRight: 10,
          fontSize: 18,
          fontWeight: 500
        }}>
          {page.title}
        </span>
      </span>
      <span style={{ fontSize: 12 }}>{era?.text?.headline}</span>
    </Box>

    <Box>
      <Tooltip placement="top" title="-100">
        <IconButton onClick={() => control(-100)}>
          <i style={{ color: 'white' }} className="fa-light fa-backward-fast"></i>
        </IconButton>
      </Tooltip>
      <Tooltip placement="top" title="-10">
        <IconButton onClick={() => control(-10)}>
          <i style={{ color: 'white' }} className="fa-light fa-backward"></i>
        </IconButton>
      </Tooltip>
      <Tooltip placement="top" title="-1">
        <IconButton onClick={() => control(-1)}>
          <i style={{ color: 'white' }} className="fa-light fa-backward-step"></i>
        </IconButton>
      </Tooltip>

      <OutlinedInput
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          height: "36px",
          width: "120px",
          fontWeight: "bold",
          color: 'white',
          fontFamily: "'Montserrat'"
        }}
        value={year}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            iframeYear()
          }
        }}
        onChange={(e) => {
          let newYear = isNaN(e.target.value) || ['-', '0'].includes(e.target.value) ? year : e.target.value
          setYear(newYear)
        }}
        endAdornment={<InputAdornment style={{ position: 'relative', top: 1 }} position="end">{year > 0 ? 'ACE' : 'BCE'}</InputAdornment>}
      />

      <Tooltip placement="top" title="+1">
        <IconButton onClick={() => control(+1)}>
          <i style={{ color: 'white' }} className="fa-light fa-forward-step"></i>
        </IconButton>
      </Tooltip>

      <Tooltip placement="top" title="+10">
        <IconButton onClick={() => control(+10)}>
          <i style={{ color: 'white' }} className="fa-light fa-forward"></i>
        </IconButton>
      </Tooltip>
      <Tooltip placement="top" title="+100">
        <IconButton onClick={() => control(+100)}>
          <i style={{ color: 'white' }} className="fa-light fa-forward-fast"></i>
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
}

function Menu() {
  return <PopupState variant="popover">
    {(popupState) => (
      <Box boxShadow={6}>
        <Button style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          zIndex: 600,
          borderRadius: "16px",
          height: "38px",
          justifyContent: 'space-between',
          backgroundColor: "white",
          color: '#2c3e50',
          border: "2px solid #2c3e50",
          textTransform: 'none',
          fontSize: 14
        }} variant="contained" startIcon={<i style={{ marginRight: 0 }} className="fa-sharp fa-books"></i>} endIcon={<i style={{ marginLeft: 24 }} className="fa-sharp fa-caret-down"></i>} {...bindTrigger(popupState)}>
          Civilisation Romaine
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              borderRadius: '16px'
            }
          }}
        >
          <Box style={{
            width: 400,
            position: 'relative',
            zIndex: 2000,
            height: 200
          }}>
          </Box>
        </Popover>
      </Box>
    )}
  </PopupState>
}

export default App

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}