// REQUIRES
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')

// CONNECT TO MONGODB
let NODE_ENV = process.env.NODE_ENV || 'development'
const DB_URI = config.db[NODE_ENV]

mongoose.Promise = Promise
mongoose.connect(DB_URI, err => console.log(err || `Mongo connected to ${DB_URI}`))

// APP DECLARATION
const app = express()

// GENERAL MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static('src'))

// ROUTES
app.use('/api', require('./routes/api'))

module.exports = app
