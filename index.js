const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
dotenv.config()

const port = 3000

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log('connect to database successfully')
})

app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())

const api = require('./src/router')
app.use('/', api)
app.listen(port, () => {
    console.log('listening on port ' + port)
})
