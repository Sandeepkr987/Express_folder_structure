const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render("index", {
    user: 'My Home Page',
    title: 'my Home page'
  })
})

router.get('/about', (req, res) => {
  res.render("about", {
    user: 'My About page',
    title: 'my about page'
  })
})


module.exports = router