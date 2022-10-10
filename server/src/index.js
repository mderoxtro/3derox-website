const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Running on ${port}`)
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'))
})
