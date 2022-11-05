const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const cors = require('cors')
const statParts = require('./parts/staticData.js')
const mongoose = require('mongoose')
const Parts = require('./models/parts.js')

const PRODUCT_DATA_FILE = path.join(__dirname, 'server-product-data.json')
const CART_DATA_FILE = path.join(__dirname, 'server-cart-data.json')

mongoose.connect("mongodb://3derox.com:27017/3derox-db")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Running on ${port}`)
  buildParts()
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'))
})

app.get("/allParts", async (req, res) => {
  let allParts = await Parts.find({});
  res.send(allParts)
})

app.post('/cart', (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data)
    const newCartProduct = {
      num: req.body.deroxNum,
      desc: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      quantity: 1
    }
    let cartProductExists = false
    cartProducts.map((cartProduct) => {
      if(cartProduct.num === newCartProduct.num){
        cartProduct.quantity++
        cartProductExists = true
      }
    })
    if(!cartProductExists) cartProducts.push(newCartProduct)
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache')
      res.json(cartProducts)
    })
  })
})

let buildParts = async () => {
  for(let part of statParts){
    const inDB = await Parts.find({deroxNum: part.deroxNum})
    if(inDB.length == 0){
      const newPart = new Parts({
        photos: part.photos,
        deroxNum: part.deroxNum,
        manNum: part.manNum,
        description: part.description,
        blurb: part.blurb,
        material: part.material,
        colors: part.colors,
        makes: part.makes,
        models: part.models,
        years: part.years,
        reqQty: part.reqQty,
        price: part.price,
        inStock: part.inStock,
        storeFronts: part.storeFronts,
        addFiles: part.addFiles
      })
      await newPart.save()
    } else {
      console.log("exists")
    }
  }
}
