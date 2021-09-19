const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const api = require('./src/router')
dotenv.config()

const port = 7000

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log('connect to database successfully')
})

app.use(morgan('tiny'))
// app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/', api)
app.listen(port, () => {
    console.log('listening on port ' + port)
})
