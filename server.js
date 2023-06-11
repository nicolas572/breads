//dependencies
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT

// MIDDLEWARE
const breadsController = require('./controllers/bread_controller.js')
app.use(methodOverride('_method'))
app.use('/breads', breadsController)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//routes
app.get('/', (req, res) => {
    res.send('Welcome to my awesome Bread app')
})

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}, () => { 
        console.log('connected to mongo: ', process.env.MONGO_URI) 
    })
        
//404 Page
app.get('*', (req, res) => {
    res.send('404')
})
        
//listen
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})