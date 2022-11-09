const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const https = require("https")
const fs = require('fs')
const qs = require('qs')
const app = express()
const cors = require('cors')
const axios = require('axios')
const statParts = require('./parts/staticData.js')
const mongoose = require('mongoose')
const Parts = require('./models/parts.js')
const authCred = require('./paypal/auth.js')
const shippoCred = require('./shippo/auth.js')

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

let paypalToken = ''

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
app.listen(port, async () => {
  console.log(`Running on port ${port}`)
  buildParts()
  tokenHandler()
  setInterval(() => tokenHandler(), 300000)
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'))
})

app.get("/allParts", async (req, res) => {
  let allParts = await Parts.find({});
  res.send(allParts)
})

app.post("/calcship", async (req, res) => {
  try {
    let calcedShip = await axios.post(shippoCred.sandboxCredentials.url, {
      address_from: req.body.data.address_from,
      address_to: req.body.data.address_to,
      parcels: req.body.data.parcels
    }, {
      headers: {
        'authorization': `ShippoToken ${shippoCred.sandboxCredentials.token}`,
        'content-type': 'application/json'
      }
    })
    console.log(calcedShip.data)
    return await calcedShip.data
  } catch(err) {
    console.dir(err.response.data.address_to)
  }
})

app.post("/checkout/create", async (req, res) => {
  try {
    let createdOrder = await axios.post(authCred.sandboxCredentials.orderUrl, {
      'intent': "CAPTURE",
      'purchase_units': req.body.data.purchase_units,
      'application_context': {
        'brand_name': '3DeRox LLC',
        'locale': 'en-US',
        'shipping_preference': 'SET_PROVIDED_ADDRESS'
      }
      // 'purchase_units': [
      //   {
      //     'items': [
      //       {
      //         'name': 'Potato',
      //         'desc': "Potatos, in a bag.",
      //         'quantity': '2',
      //         'unit_amount': {
      //           'currency_code': 'USD',
      //           'value': '300'
      //         }
      //       }
      //     ],
      //     'amount': {
      //       'currency_code': 'usd',
      //       'value': '600',
      //       'breakdown': {
      //         'item_total': {
      //           'currency_code': 'USD',
      //           'value': '600'
      //         }
      //       }
      //     }
      //   },
      // ]
    }, {
      headers: {
        'authorization': `bearer ${paypalToken}`,
        'content-type': 'application/json',
      }
    })
    console.log(createdOrder)
  } catch(ex) {
    console.dir(ex.response.data)
  }
})

let tokenHandler = async () => {
  let currentToken = await authPaypal().then((response) => {
    paypalToken = response.data.access_token
  })
}

let authPaypal = async () => {
  try {
    let token = await axios.post(authCred.sandboxCredentials.url, {
      grant_type:"client_credentials"
    }, {
      auth: {
        username: authCred.sandboxCredentials.api,
        password: authCred.sandboxCredentials.secret,
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    return await token
  } catch(ex) {
    console.log(ex)
  }
}

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
        weight: part.weight
      })
      await newPart.save()
    } else {
      console.log("exists")
    }
  }
}
