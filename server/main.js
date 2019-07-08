import express from 'express'
import bp from 'body-parser'

let port = 3000

let server = express()
server.use(bp.json())


let fakeDB = {
  cats: [{ name: "Fluffy", color: "orange", size: "small" }]
}


function getAllCats(req, res, next) {
  res.send({ data: fakeDB, message: "Got the cats!" })
}

function addCat(req, res, next) {
  let newCat = req.body
  fakeDB.cats.push(newCat)
  res.status(201).send("created a new cat!")
}


function defaultErrorHandler(req, res, next) {
  res.status(404).send("route not found")
}


server.get('/', express.static(__dirname + '/../public'))
server.get('/api/cats', getAllCats)
server.post('/api/cats', addCat)
server.get('/api/dogs', (req, res, next) => {
  res.status(418).send("I'm a teapot!")
})

server.use('*', defaultErrorHandler)


server.listen(port, () => {
  console.log("server is running on port: ", port, "you better go catch it!")
})
