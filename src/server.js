/**
 * Created by ahamilton on 10/19/17.
 */
import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'

import initBasicRouter from './basicRouter'
import initApiRouter from './apiRouter'

let runApp = function (db) {
  const app = express()
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  let basicRouter = initBasicRouter(db)
  let apiRouter = initApiRouter(db)

  app.use('/', basicRouter)
  app.use('/api', apiRouter)

  let port = process.env.PORT || 4000
  app.listen(port, function () {
    console.log(`Listening on port ${port}`)
  })
}

mongodb.MongoClient.connect(process.env.MONGODB_URL).then(runApp)