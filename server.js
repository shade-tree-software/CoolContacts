/**
 * Created by ahamilton on 10/19/17.
 */
const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
const ejs = require('ejs')
const co = require('co')
const assert = require('assert')

const babel = require("babel-core");

//const browserify = require("browserify");
//const babelify = require("babelify");

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
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/', function (req, res) {
    co(function* () {
      let people = yield db.collection('people').find().toArray()
      ejs.renderFile('people.ejs', {people: people}, {}, function (err, htmlString) {
        res.send(htmlString)
      })
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.get('/react_stuff.js', function(req, res){
    //res.send(fs.readFileSync('bundle.js', 'utf8'))
    //
    res.send(babel.transformFileSync("react_stuff.jsx").code)
    //
    //browserify('react_stuff.jsx').transform(babelify).bundle(function(err, buf){
    //  res.send(buf)
    //})
  })

  app.post('/person/new', function (req, res) {
    let person = {name: req.body.name, number: req.body.number}
    db.collection('people').insertOne(person).then(function (r) {
      assert.equal(1, r.insertedCount)
      res.redirect('/')
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.post('/person/delete', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.body.id)}
    db.collection('people').deleteOne(query).then(function (r) {
      assert.equal(1, r.deletedCount)
      res.redirect('/')
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  app.listen(4000, function () {
    console.log('Listening on port 4000')
  })
}