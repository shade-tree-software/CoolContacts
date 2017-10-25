/**
 * Created by ahamilton on 10/19/17.
 */
import express from 'express'
const app = express()
import fs from 'fs';
import bodyParser from 'body-parser'
import assert from 'assert'

const mongodbUrl = fs.readFileSync('.mongodb_url', 'utf8')
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
  app.use(express.static('dist'))

  app.get('/api/people/:_id', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    db.collection('people').findOne(query).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.get('/api/people', function (req, res) {
    db.collection('people').find({}, {firstName: true, lastName: true}).toArray(function (err, result) {
      res.send(result)
    })
  })

  app.get('*', function (req, res) {
    res.sendFile('index.html', {root: __dirname})
  })

  app.post('/api/people/new', function (req, res) {
    let person = req.body.person
    db.collection('people').insertOne(person).then(function (r) {
      assert.equal(1, r.insertedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.post('/api/people/:_id', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    let update = {$set: {[req.params.name]: req.params.value}}
    db.collection('people').updateOne(query, update).then(function (r) {
      console.log(JSON.stringify(r))
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.delete('/api/people/:_id', function (req, res) {
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