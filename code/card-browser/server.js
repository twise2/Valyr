const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
console.log('starting express server')
app.use(express.static(path.join(__dirname, 'build')));
//don't touch dirname before build
const directoryPath = path.join(__dirname + '../../../units/');

app.use('/templates', express.static(__dirname + '/templates'))

app.get('/unitNames', function(req, res) {
  return fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    return res.send(files);
  });
});

app.get('/units', function(req, res) {
  let data = {};
  fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    console.log('Printing All Parsing Errors...');
    //listing all files using forEach
    files.forEach(function(file) {
      contents = fs.readFileSync(directoryPath + file, 'utf8')
      data[file]=(JSON.parse(contents));
    });
    return res.send(data);
  });
});

app.get('/unit/:cardName', function(req, res) {
  contents = fs.readFileSync(directoryPath + req.params.cardName, 'utf8');
  return res.send(JSON.parse(contents))
});

console.log(`server listening on port 8080`)
app.listen(8080);
