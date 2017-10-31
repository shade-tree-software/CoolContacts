import express from 'express'
import mongodb from 'mongodb'
import assert from 'assert'
import jwt from 'jsonwebtoken'
import pwHash from 'password-hash'

import RouterLogger from './RouterLogger'

export default function (db) {

  let apiRouter = express.Router()
  let routerLogger = new RouterLogger('API')
  apiRouter.use(routerLogger.log);

  apiRouter.post('/authenticate', function (req, res) {
    let query = {username: req.body.username}
    db.collection('users').findOne(query).then(function (data) {
      if (data && pwHash.verify(req.body.password, data.password)) {
        let token = jwt.sign(query, process.env.SECRET)
        res.json({
          success: true,
          message: 'access granted',
          token: token
        })
      } else(
        res.sendStatus(404)
      )
    }).catch(function (err) {
      console.log(err.stack)
    })
  });

  apiRouter.use(function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token.'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({success: false, message: 'No token provided.'});
    }
  });

  apiRouter.route('/people')
    .get(function (req, res) {
      db.collection('people').find({}, {firstName: true, lastName: true}).toArray(function (err, result) {
        res.send(result)
      })
    })
    .post(function (req, res) {
      let person = req.body.person
      db.collection('people').insertOne(person).then(function (r) {
        assert.equal(1, r.insertedCount)
        res.sendStatus(200)
      }).catch(function (err) {
        console.log(err.stack)
      })
    })

  apiRouter.route('/people/:_id')
    .get(function (req, res) {
      let query = {_id: new mongodb.ObjectID(req.params._id)}
      db.collection('people').findOne(query).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        console.log(err.stack)
      })
    })
    .put(function (req, res) {
      let query = {_id: new mongodb.ObjectID(req.params._id)}
      let update = {$set: {[req.body.name]: req.body.value}}
      db.collection('people').updateOne(query, update).then(function (r) {
        res.sendStatus(200)
      }).catch(function (err) {
        console.log(err.stack)
      })
    })
    .delete(function (req, res) {
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