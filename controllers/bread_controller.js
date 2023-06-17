const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const mongoose = require('mongoose')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.find()
          .then(foundBreads => {
          res.render('index', {
            breads: foundBreads,
            bakers: foundBakers,
            title: 'Index Page'
      })
    })
  })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread
      })
    })
    // bread: Bread[req.params.indexArray],
    // index: req.params.indexArray
})

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

//show
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('<h1>404: This is not a page you should be on</h1>')
    })
})
//     if (Bread[req.params.arrayIndex]) {
//       res.render('Show', {
//         bread:Bread[req.params.arrayIndex]
//       })
//     } else {
//       res.render('404')
//     }
// })

// CREATE
breads.post('/', express.urlencoded({extended: true}), (req, res) => {
  //console.log('undefined')
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
  .then(deletedBread => { 
    res.status(303).redirect('/breads')
  })
})

// UPDATE
breads.put('/:id', express.urlencoded({extended: true}), (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedBread => {
    console.log(updatedBread)
    res.redirect(`/breads/${req.params.id}`)
  })
})

module.exports = breads

