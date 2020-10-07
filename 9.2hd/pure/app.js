const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const mineType = require('mime-types')
const multiparty = require('multiparty')
app.use(cors())
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/users'
const Picture =require('./Picture')
app.get('/', function (req, res)
 {
  res.sendFile(path.join(__dirname, 'static', 'build', 'index.html'))
})



app.post('/', async function (req, res) {

  let form = new multiparty.Form()
  form.parse(req, function (err, fields, file) {

    const tags = fields.tags
    const pictures = file.pictures.map((files, index) => {
      files.tag = tags[index]    
      console.log(files)
      let data = fs.readFileSync(files.path)
      data = new Buffer(data).toString('base64')
      files.base64 = 'data:' + mineType.lookup(files.path) + ';base64,' + data
      return files
    })
var pic = new Picture(
  {
    type:pictures
  }
)

pic.save().catch((err)=>console.log(err))

})
})

app.listen("3006", () => {
  console.log("listenning at port 3006")
})
