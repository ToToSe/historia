const path = require('path')
const express = require('express')
const request = require('request')
const app = express()
const cors = require('cors')
const cheerio = require('cherio')
const bodyParser = require('body-parser')

let $

app.use(bodyParser.json())

app.use(cors({
  exposedHeaders: ["Link"],
  origin: [
    'https://historia-io.herokuapp.com',
    'http://historia-io.herokuapp.com',
    'https://fr.wikipedia.org',
    'http://localhost:3000',
  ],
  methods: ['OPTIONS', 'GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
}))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');

  next();
});


const PERIODS = [
  {
    name: 'Summer',
    events: [
      {
        year: -3000,
        title: `Cunéiforme`,
        url: `Cunéiforme`
      }
    ]
  },
  {
    name: 'Egypte',
    events: [
      {
        year: -3000,
        title: `Écriture hiéroglyphique égyptienne`,
        url: `Écriture_hiéroglyphique_égyptienne`
      }
    ]
  },
  {
    name: 'Babylone',
    events: [
      {
        year: -2000,
        title: `Babylone`,
        url: `Babylone_(civilisation)`,
      }
    ]
  },
  {
    name: 'Assyrie',
    events: [
      {
        year: -2500,
        title: `Assyrie`,
        url: `Assyrie`,
      }
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
    name: 'Carthage',
    events: [
      {
        year: -814,
        title: `Carthage`,
        url: `Civilisation_carthaginoise`
      },
    ]
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
  },
  {
    name: 'Allemagne',
    events: [
      {
        year: 924,
        title: `Saint-Empire romain germanique`,
        url: `Saint-Empire_romain_germanique`
      }
    ]
  },
  {
    name: 'Anglettere',
    events: [
      {
        year: 927,
        title: `Royaume d'Angleterre`,
        url: `Royaume_d%27Angleterre`
      }
    ]
  },
  {
    name: 'Tampon',
    events: [
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
      { year: 2042, title: ``, url: `` },
    ]
  },
]

app.get('/periods', async (req, res) => {
  res.json(PERIODS)
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
  </script>
  <style>
    @media screen and (max-width: 1086px) {
      #mw-panel-toc {
        display: none;
      }
    }
  </style>`);

    html('.mw-article-toolbar-container').remove()
    html('.mw-footer-container').remove()
    html('.mw-body-header').remove()
    html('.vector-body-before-content').remove()
    html('.bandeau-container').remove()
    html('.vector-page-toolbar').remove()
    html('.mw-header').remove()
    html('#catlinks').remove()
    html('#mw-navigation').remove()
    html('.entete').css('color', 'white')
    html('.entete').css('background-color', '#' + req.query.color)
    html('body').css('margin-top', '-32px')
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

app.use(express.static(path.join(__dirname, './build')))

app.use('/geacron', express.static(path.join(__dirname, './geacron')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})

app.listen(8080)