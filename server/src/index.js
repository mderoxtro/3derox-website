const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const https = require("https")
const fs = require('fs')
const app = express()
const cors = require('cors')
const statParts = require('./parts/staticData.js')
const mongoose = require('mongoose')
const Parts = require('./models/parts.js')

// PRODUCTION CONNECT
// mongoose.connect("mongodb://3derox.com:27017/3derox-db")

// DEV CONNECT
mongoose.connect("mongodb://localhost:27017/3derox-db")

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

// PRODUCTION CODE
// https.createServer({
//   key: fs.readFileSync("/etc/letsencrypt/live/3derox.com/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/3derox.com/cert.pem"),
//   ca: fs.readFileSync("/etc/letsencrypt/live/3derox.com/chain.pem")
// }, app).listen(port, () => {
//   console.log(`Running on ${port}`)
//   buildParts()
// })

// DEV CODE
app.listen(port, () => {
  console.log(`Running on port ${port}`)
  buildParts()
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'))
})

app.get("/allParts", async (req, res) => {
  let allParts = await Parts.find({});
  res.send(allParts)
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
        addFiles: part.addFiles,
        condFlags: part.condFlags,
      })
      await newPart.save()
    } else {
      console.log("exists")
    }
  }
}
