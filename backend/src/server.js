const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const server = express()
mongoose.connect('mongodb+srv://omnistack:omnistack@learningcluster-x3rc8.mongodb.net/omnistack8?retryWrites=true&w=majority', {useNewUrlParser: true})//Needs to be before routes

server.use(cors()) //Needs to be before routes
server.use(express.json()) //Needs to be before routes

server.use(routes)

server.listen(3333)
