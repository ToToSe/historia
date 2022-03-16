const path = require('path')
const express = require('express')
const request = require('request');
const app = express()
const cheerio = require('cherio')
const Period = require('./period')

require('./mongodb')

let $

request('http://geacron.com/map/atlas/mapal.html?lang=fr', (error, response, body) => {
  $ = cheerio.load(body.replace('mapal_REPOSI.js', 'http://geacron.com/map/atlas/mapal_REPOSI.js?n=817'))

  $('body form:not([name="mapa"])').remove()
  $('body').css('opacity', 0)
  $('body').css('overflow', 'hidden')

  $('body').prepend(`<script>
    setTimeout(() => {
      putfecha(YEAR_REPLACE)
      
      let input = document.querySelectorAll('[name="Fecha"]')[0]
      let date = document.querySelectorAll('[name="sliderValue2"]')[0]
      let mapEl = document.querySelectorAll('#map')[0]

      input.style.display = 'none'
      date.style.display = 'none'
      
      mapEl.style.height = '100%'
      mapEl.style.top = '0'

      map.updateSize()
      map.zoomTo(4)
      map.setCenter([2896115.2958004, 5302161.5318014])

      document.getElementsByTagName('body')[0].style.opacity = '1';
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';



      window.addEventListener("message", (event) => {
        var data = event.data;
        if (!!data.year) {
          putfecha(data.year)
        }
      }, false)

    }, 1000)
  </script>`);
})

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.MONGOURI ? 'http://historia-io.herokuapp.com' : 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});







app.get('/seedperiods', async (req, res) => {
  await Period.create([
    {
      name: 'Summer',
      events: [
        {
          year: -3000,
          title: `Histoire de l'écriture`,
          url: `Histoire_de_l%27écriture`
        }
      ]
    },
    {
      name: 'Anglettere',
      events: []
    },
    {
      name: 'Allemagne',
      events: []
    },
    {
      name: 'Egypte',
      events: []
    },
    {
      name: 'Assyrie',
      events: []
    },
    {
      name: 'Babylone',
      events: []
    },
    {
      name: 'Rome',
      events: [
        {
          year: -753,
          title: `Royauté romaine`,
          url: `Royauté_romaine`
        },
        {
          year: -509,
          title: `République romaine`,
          url: `République_romaine`
        },
        {
          year: -264,
          title: `Première guerre punique`,
          url: `Première_guerre_punique`
        },
        {
          year: -218,
          title: `Deuxième guerre punique`,
          url: `Deuxième_guerre_punique`
        },
        {
          year: -149,
          title: `Troisième guerre punique`,
          url: `Troisième_guerre_punique`
        },
        {
          year: -58,
          title: `Guerre des Gaules`,
          url: `Guerre_des_Gaules`,
        },
        {
          year: -27,
          title: `Empire romain`,
          url: `Empire_romain`,
        },
        {
          year: 476,
          title: `Empire romain d'Occident`,
          url: `Empire_romain_d%27Occident`
        },
        {
          year: 1453,
          title: `Chute de Constantinople`,
          url: `Chute_de_Constantinople`
        },
      ]
    },
    {
      name: 'Grèce',
      events: [
        {
          year: -480,
          title: `Bataille de Salamine`,
          url: `Bataille_de_Salamine`
        },
      ]
    },
    {
      name: 'France',
      events: [
        {
          year: 481,
          title: `Royaumes francs`,
          url: `Royaumes_francs`
        },
        {
          year: 1789,
          title: `Révolution française`,
          url: `Révolution_française`
        },
      ]
    }
  ])
  res.json(true)
})

app.get('/periods', async (req, res) => {
  res.json(await Period.find({}))
})

app.post('/periods', async (req, res) => {
  res.json(await Period.create(req.body))
})

app.put('/periods/:_id', async (req, res) => {
  await Period.update(req.body)
  res.json(true)
})





app.get('/geacron', (req, res) => {
  let year = req.query.year
  let html = $('html').html().replace('YEAR_REPLACE', year)

  res.send(html)
})


app.get('/wiki', (req, res) => {
  let url = `https://fr.wikipedia.org/wiki/${encodeURIComponent(req.query.url)}`

  request(url, (error, response, body) => {
    let html = cheerio.load(body)

    html('body').append(`<script>
    setTimeout(() => {
      document.querySelectorAll('a').forEach((e) => {
        if (!e.hash) {
          if(e.getElementsByTagName('img').length > 0) {
            let img = e.getElementsByTagName('img')[0]
            let url = "https://upload.wikimedia.org/wikipedia/commons/"
            e.href = url + img.src.split('/')[6] + '/' + img.src.split('/')[7] +'/' + img.src.split('/')[8]
          } else {
            e.href = e.href.replace('http://localhost:8080', 'https://fr.wikipedia.org').replace('http://historia-io.herokuapp.com', 'https://fr.wikipedia.org')
          }
          e.target = '_blank'
        }
      })
    }, 300)
  </script>`);

    html('.mw-footer-container').remove()
    html('.mw-body-header').remove()
    html('.mw-header').remove()
    html('#catlinks').remove()
    html('#mw-navigation').remove()
    html('body').css('background', 'white')
    html('body').css('overflow-x', 'hidden')
    html('#firstHeading').css('border', 'none')
    html('.mw-page-container').css('border', 'none')
    html('.mw-content-container').css('margin-left', '0px')
    html('.mw-content-container').css('max-width', 'inherit')
    html('#p-lang-btn').html('<a href="' + url + '" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WIKIPedia_lOGO.png" style="width: 200px" /></a>')

    html('body').prepend(`<style>
    /* width */
    ::-webkit-scrollbar {
      width: 4px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #b5b5b5; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #2c3e50; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #2c3e50;
    }
  </style>`);

    html = html('html').html().replaceAll('/w/load.php', 'https://fr.wikipedia.org/w/load.php')

    res.send(html)
  })
})

app.use(express.static(path.join(__dirname,'./build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});
app.listen(process.env.PORT || 8080)