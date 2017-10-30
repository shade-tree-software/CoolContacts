import fs from 'fs'
import mongodb from 'mongodb'

export default function () {
  return new Promise((resolve, reject) => {
    const mongodbUrl = process.env.MONGODB_URL || fs.readFileSync('.mongodb_url', 'utf8')
    const MongoClient = mongodb.MongoClient;
    MongoClient.connect(mongodbUrl).then(function (db) {
      console.log("Connected to database");
      resolve(db)
    }).catch(function (err) {
      reject(err)
    })
  })
}
