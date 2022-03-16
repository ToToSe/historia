const mongoose = require('mongoose')

module.exports = mongoose.model('Period', new mongoose.Schema({
  name: String,
  events: [{
    year: Number,
    title: String,
    url: String,
  }]
}))