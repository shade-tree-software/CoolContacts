import express from 'express'
import mongodb from 'mongodb'
import assert from 'assert'
import RouterLogger from './RouterLogger'

export default function(db){

  let apiRouter = express.Router()
  let routerLogger = new RouterLogger('API')
  apiRouter.use(routerLogger.log);
  apiRouter.get('/people', function (req, res) {
    db.collection('people').find({}, {firstName: true, lastName: true}).toArray(function (err, result) {
      res.send(result)
    })
  })
  apiRouter.get('/people/:_id', function(req, res){
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    db.collection('people').findOne(query).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })
  apiRouter.post('/people', function (req, res) {
    let person = req.body.person
    db.collection('people').insertOne(person).then(function (r) {
      assert.equal(1, r.insertedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })
  apiRouter.put('/people/:_id', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    let update = {$set: {[req.body.name]: req.body.value}}
    db.collection('people').updateOne(query, update).then(function (r) {
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })
  apiRouter.delete('/people/:_id', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.params._id)}
    db.collection('people').deleteOne(query).then(function (r) {
      assert.equal(1, r.deletedCount)
      res.sendStatus(200)
    }).catch(function (err) {
      console.log(err.stack)
    })
  })

  return apiRouter
}