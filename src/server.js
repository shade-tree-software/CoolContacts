/**
 * Created by ahamilton on 10/19/17.
 */
import express from 'express'
const app = express()
import fs from 'fs';
import bodyParser from 'body-parser'
import assert from 'assert'

const mongodbUrl = process.env.MONGODB_URL || fs.readFileSync('.mongodb_url', 'utf8')
import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;
MongoClient.connect(mongodbUrl).then(function (db) {
  console.log("Connected to database");
  runApp(db)
}).catch(function (err) {
  console.log(err.stack)
})

let runApp = function (db) {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  let basicRouter = express.Router()

  basicRouter.get('/client.js', function(req, res){
    console.log('BASIC GET: /client.js')
    res.sendFile('client.js', {root: __dirname})
  })

  basicRouter.get('/', function(req, res){
    console.log('BASIC GET: /')
    res.sendFile('index.html', {root: __dirname})
  })

  basicRouter.get('/about', function(req, res){
    console.log('BASIC GET: /about')
    res.sendFile('index.html', {root: __dirname})
  })

  basicRouter.get('/people/*', function(req, res){
    console.log('BASIC GET: /people/:_id')
    res.sendFile('index.html', {root: __dirname})
  })

  app.use('/', basicRouter)

  let apiRouter = express.Router()

  apiRouter.get('/people', function (req, res) {
    console.log('API GET: /people')
    db.collection('people').find({}, {firstName: true, lastName: true}).toArray(function (err, result) {
      res.send(result)
    })
  })

  apiRouter.get('/people/:_id', function(req, res){
    console.log('API GET: /people/:_id')
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    db.collection('people').findOne(query).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  apiRouter.post('/people/new', function (req, res) {
    console.log('API POST: /people/new')
    let person = req.body.person
    db.collection('people').insertOne(person).then(function (r) {
      assert.equal(1, r.insertedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  apiRouter.put('/people/:_id', function (req, res) {
    console.log('API PUT: /people/:_id')
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    let update = {$set: {[req.body.name]: req.body.value}}
    db.collection('people').updateOne(query, update).then(function (r) {
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  apiRouter.delete('/people/:_id', function (req, res) {
    console.log('API DELETE: /people/:_id')
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    db.collection('people').deleteOne(query).then(function (r) {
      assert.equal(1, r.deletedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.use('/api', apiRouter);

  let port = process.env.PORT || 4000
  app.listen(port, function () {
    console.log(`Listening on port ${port}`)
  })
}