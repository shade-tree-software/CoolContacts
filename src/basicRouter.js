import express from 'express'
import RouterLogger from './RouterLogger'

export default function(db){

  let basicRouter = express.Router()
  let routerLogger = new RouterLogger('BASIC')
  basicRouter.use(routerLogger.log);
  basicRouter.get('/client.js', function(req, res){
    res.sendFile('client.js', {root: __dirname})
  })
  basicRouter.get('/app.css', function(req, res){
    res.sendFile('app.css', {root: __dirname})
  })
  basicRouter.get(['/', '/login', '/about', '/main', '/people/:_id'], function(req, res){
    res.sendFile('index.html', {root: __dirname})
  })

  return basicRouter
}