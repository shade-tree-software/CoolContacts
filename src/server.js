/**
 * Created by ahamilton on 10/19/17.
 */
import express from 'express'
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
const assert = require('assert')
const browserify = require("browserify");
const babelify = require("babelify");

const mongodbUrl = fs.readFileSync('.mongodb_url', 'utf8')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
MongoClient.connect(mongodbUrl).then(function (db) {
  console.log("Database loaded");
  runApp(db)
}).catch(function (err) {
  console.log(err.stack)
})

let runApp = function (db) {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.send(fs.readFileSync('index.html', 'utf8'))
  })

  app.use(express.static('dist'))

  app.get('/people', function (req, res) {
    db.collection('people').find().toArray(function (err, result) {
      res.send(result)
    })
  })

  app.post('/people/new', function (req, res) {
    let person = req.body.person
    db.collection('people').insertOne(person).then(function (r) {
      assert.equal(1, r.insertedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.delete('/people/:_id', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    db.collection('people').deleteOne(query).then(function (r) {
      assert.equal(1, r.deletedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.listen(4000, function () {
    console.log('Listening on port 4000')
  })
}