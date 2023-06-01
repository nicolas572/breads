//dependencies
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

//routes
app.get('/', (req, res) => {
    res.send('Welcome to an awesome app about breads!')
})

//breads
const breadsController = require('./controllers/bread_controller.js')
app.use('/breads', breadsController)

//listen
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})