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
const buildSettings = require('./buildSettings.js')
const Parts = require('./models/parts.js')
const authConfig = require('../../serve_config/config.js')

let serveProduction = buildSettings.isProduction

if(serveProduction){
  mongoose.connect("mongodb://3derox.com:27017/3derox-db")
} else {
  mongoose.connect("mongodb://localhost:27017/3derox-db")
}


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

if(serveProduction){
  https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/3derox.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/3derox.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/3derox.com/chain.pem")
  }, app).listen(port, () => {
    console.log(`Running on ${port}`)
    buildParts()
  })
} else {
  app.listen(port, async () => {
    console.log(`Running on port ${port}`)
    buildParts()
  })
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'))
})

app.get("/allParts", async (req, res) => {
  let allParts = await Parts.find({});
  res.send(allParts)
})

app.post("/checkout/complete", async (req, res) => {
  let paypalToken = ""
  let paypalOrderUrl = ""
  if(serveProduction){
    let url = authConfig.serverConfig.paypalUrlProduction
    let api = authConfig.serverConfig.paypalAPIProduction
    let secret = authConfig.serverConfig.paypalSecretProduction
    paypalOrderUrl = authConfig.serverConfig.paypalOrderProduction
    paypalToken = await authPaypal(url, api, secret)
  } else {
    let url = authConfig.serverConfig.paypalUrlSandbox
    let api = authConfig.serverConfig.paypalAPISandbox
    let secret = authConfig.serverConfig.paypalSecretSandbox
    paypalOrderUrl = authConfig.serverConfig.paypalOrderSandbox
    paypalToken = await authPaypal(url, api, secret)
  }
  try {
    let capturedOrder = await axios.post(paypalOrderUrl + "/" + req.body.data.orderID + "/capture", {}, {
      headers: {
        'authorization': `bearer ${paypalToken}`,
        'content-type': 'application/json',
      }
    })
    res.sendStatus(200)
  } catch(error) {
    console.error(error.response.data)
    if(error.response.data.details.issue == "ORDER_NOT_APPROVED"){
      res.send("Order is not approved, please approve via Paypal")
    } else {
      res.send("Error")
    }
  }
})

app.post("/checkout/cancel", async (req, res) => {
  let paypalToken = ""
  let paypalVoidUrl = ""
  if(serveProduction){
    let url = authConfig.serverConfig.paypalUrlProduction
    let api = authConfig.serverConfig.paypalAPIProduction
    let secret = authConfig.serverConfig.paypalSecretProduction
    paypalVoidUrl = authConfig.serverConfig.paypalOrderProduction
    paypalToken = await authPaypal(url, api, secret)
  } else {
    let url = authConfig.serverConfig.paypalUrlSandbox
    let api = authConfig.serverConfig.paypalAPISandbox
    let secret = authConfig.serverConfig.paypalSecretSandbox
    paypalVoidUrl = authConfig.serverConfig.paypalOrderSandbox
    paypalToken = await authPaypal(url, api, secret)
  }
  try {
    let voidedOrder = await axios.post(paypalVoidUrl + "/" + req.body.data.orderID + "/void", {}, {
      headers: {
        'authorization': `bearer ${paypalToken}`,
        'content-type': 'application/json',
      }
    })
  } catch(error) {
    console.error(error.response.data)
  }
})

app.post("/calcship", async (req, res) => {
  let shippoUrl = ""
  let shippoToken = ""
  if(serveProduction){
    shippoUrl = authConfig.serverConfig.shippoUrlProduction
    shippoToken = authConfig.serverConfig.shippoTokenProduction
  } else {
    shippoUrl = authConfig.serverConfig.shippoUrlSandbox
    shippoToken = authConfig.serverConfig.shippoTokenSandbox
  }
  try {
    let calcedShip = await axios.post(shippoUrl, {
      address_from: req.body.data.address_from,
      address_to: req.body.data.address_to,
      parcels: req.body.data.parcels
    }, {
      headers: {
        'authorization': `ShippoToken ${shippoToken}`,
        'content-type': 'application/json'
      }
    })
    res.send(calcedShip.data.rates)
  } catch(err) {
    console.dir(err)
  }
})

app.post("/checkout/create", async (req, res) => {
  let paypalToken = ""
  let paypalOrderUrl = ""
  let returnUrl = ""
  if(serveProduction){
    let url = authConfig.serverConfig.paypalUrlProduction
    let api = authConfig.serverConfig.paypalAPIProduction
    let secret = authConfig.serverConfig.paypalSecretProduction
    returnUrl = "https://www.3derox.com/checkout/complete"
    paypalOrderUrl = authConfig.serverConfig.paypalOrderProduction
    paypalToken = await authPaypal(url, api, secret)
  } else {
    let url = authConfig.serverConfig.paypalUrlSandbox
    let api = authConfig.serverConfig.paypalAPISandbox
    let secret = authConfig.serverConfig.paypalSecretSandbox
    returnUrl = "http://localhost:5173/checkout/complete"
    paypalOrderUrl = authConfig.serverConfig.paypalOrderSandbox
    paypalToken = await authPaypal(url, api, secret)
  }
  try {
    let createdOrder = await axios.post(paypalOrderUrl, {
      'intent': "CAPTURE",
      'purchase_units': req.body.data.purchase_units,
      'application_context': {
        'brand_name': '3DeRox LLC',
        'locale': 'en-US',
        'shipping_preference': 'SET_PROVIDED_ADDRESS',
        'return_url': returnUrl
      }
    }, {
      headers: {
        'authorization': `bearer ${paypalToken}`,
        'content-type': 'application/json',
      }
    })
    res.send(createdOrder.data)
  } catch(ex) {
    console.dir(ex.response.data)
    res.send(ex.response.data)
  }
})

let authPaypal = async (url, api, secret) => {
  try {
    let response = await axios.post(url, {
      grant_type:"client_credentials"
    }, {
      auth: {
        username: api,
        password: secret,
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data.access_token
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
