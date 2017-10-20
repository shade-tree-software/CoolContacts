/**
 * Created by ahamilton on 10/19/17.
 */

const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  fs.readFile('db.json', 'utf8', function(err, contents){
    let data = JSON.parse(contents)
    ejs.renderFile('people.ejs', data, {}, function(err, htmlString){
      res.send(htmlString)
    })
  })
})

app.post('/person/new', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, contents) {
    let data = JSON.parse(contents)
    data.people.rows.push({id: data.people.next_id++, name: req.body.name, number: req.body.number})
    fs.writeFile('db.json', JSON.stringify(data), function(){
      res.redirect('/')
    })
  })
})

app.post('/person/delete', function(req, res){
  fs.readFile('db.json', 'utf8', function(err, contents) {
    let data = JSON.parse(contents)
    for (let index=0; index < data.people.rows.length; index++){
      if (data.people.rows[index].id == req.body.id){
        delete data.people.rows[index];
        break
      }
    }
    data.people.rows = data.people.rows.filter(function(x){
      return (x != undefined)
    })
    fs.writeFile('db.json', JSON.stringify(data), function(){
      res.redirect('/')
    })
  })
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})