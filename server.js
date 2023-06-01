//dependencies
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
const breadsController = require('./controllers/bread_controller.js')
app.use('/breads', breadsController)
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


//routes
app.get('/', (req, res) => {
    res.send('Welcome to an awesome app about breads!')
})

//listen
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})