const express = require('express')
const router = express.Router()
let Data = require('../Data.js')

router.get('/products', (req, res) => {
  res.render("products", {
    user: 'My product Page',
  })
})

router.get('/api/products', (req, res) => {
  res.json(Data)
})
router.post('/api/products', (req, res) => {
 const {name, price} = req.body
 const myData = {
  id: new Date().getTime().toString(),
    name,
    price,
 }
  Data.push(myData)
  res.json(myData)
})
router.delete('/api/products/:id', (req, res) => {
  Data = Data.filter((data) => req.params.id !== data.id)
  res.json({status : 'ok'})
})


module.exports = router;