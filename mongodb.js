const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURI || 'mongodb://localhost:27017/historia')