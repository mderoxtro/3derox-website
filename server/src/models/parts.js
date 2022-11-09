const mongoose = require('mongoose')

const partsSchema = new mongoose.Schema({
  photos: {
    type: Array,
    default: ["/logo.png"]
  },
  deroxNum: {
    type: String,
    trim: true,
    default: "Unknown",
  },
  manNum: {
    type: String,
    trim: true,
    default: "Unknown",
  },
  description: {
    type: String,
    default: "An unknown part."
  },
  blurb: {
    type: String,
    default: "An unknown part."
  },
  material: {
    type: Array,
    default: ["ABS Plastic"]
  },
  colors: {
    type: Array,
    default: ["White"]
  },
  makes: {
    type: Array,
    default: ["Chevrolet", "Pontiac"]
  },
  models: {
    type: Array,
    default: ["Camaro", "Firebird"]
  },
  years: {
    type: Array,
    default: ["1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992"]
  },
  reqQty: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Number,
    default: 0
  },
  storefronts: {
    type: Array,
    default: [ "eBay", "Etsy", "Amazon", "Facebook"]
  },
  addFiles: {
    type: Array,
    default: ["None"]
  },
  condFlags: {
    type: Array,
    default: ["None"]
  },
  weight: {
    type: Number,
    default: 1
  }
})

const Parts = mongoose.model("Parts", partsSchema)

module.exports = Parts
