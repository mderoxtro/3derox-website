const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const statParts = require('./parts/staticData.js')
const mongoose = require('mongoose')
const Parts = require('./models/parts.js')

mongoose.connect("mongodb://127.0.0.1:27017/3derox-db")

app.use(express.json())
app.use(cors())

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

let buildParts = async () => {
  for(let part of statParts){
    const inDB = await Parts.find({deroxNum: part.deroxNum})
    if(inDB.length == 0){
      const newPart = new Parts({
        photos: part.photos,
        deroxNum: part.deroxNum,
        manNum: part.manNum,
        description: part.description,
        material: part.material,
        colors: part.colors,
        makes: part.makes,
        models: part.models,
        years: part.years,
        reqQty: part.reqQty,
        price: part.price,
        storeFronts: part.storeFronts,
        addFiles: part.addFiles
      })
      await newPart.save()
    } else {
      console.log("exists")
    }
  }
}
