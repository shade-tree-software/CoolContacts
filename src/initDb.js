import fs from 'fs'
import mongodb from 'mongodb'

export default function (cb) {
  const mongodbUrl = process.env.MONGODB_URL || fs.readFileSync('.mongodb_url', 'utf8')
  const MongoClient = mongodb.MongoClient;
  MongoClient.connect(mongodbUrl).then(function (db) {
    console.log("Connected to database");
    cb(db)
  }).catch(function (err) {
    console.log(err.stack)
  })
}
