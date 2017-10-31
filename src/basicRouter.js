import express from 'express'
import RouterLogger from './RouterLogger'

export default function(db){

  let basicRouter = express.Router()
  let routerLogger = new RouterLogger('BASIC')
  basicRouter.use(routerLogger.log);
  basicRouter.get('/client.js', function(req, res){
    res.sendFile('client.js', {root: __dirname})
  })
  basicRouter.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname})
  })

  return basicRouter
}