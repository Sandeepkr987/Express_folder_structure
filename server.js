const express = require('express')
const app = express()
const port = 3000
const Path = require('path')
const mainRouter = require('./routes/index')
const productRouter = require('./routes/products')

app.use(express.static("public"))
app.use(express.json())
//template engine
app.set("view engine", "ejs")

//use Router
app.use( mainRouter)
app.use( productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
