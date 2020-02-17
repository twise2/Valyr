const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
console.log('starting express server');
app.use(express.static(path.join(__dirname, 'build')));
//don't touch dirname before build
const unitDirectoryPath = path.join(__dirname + '../../../units/');
const factionsFilePath = path.join(__dirname + '../../../factions.json');

app.use('/templates', express.static(__dirname + '/templates'));

app.get('/unitNames', function(req, res) {
  return fs.readdir(unitDirectoryPath, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    return res.send(files);
  });
});

app.get('/units', function(req, res) {
  let data = {};
  fs.readdir(unitDirectoryPath, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    console.log('Printing All Parsing Errors...');
    //listing all files using forEach
    files.forEach(function(file) {
      contents = fs.readFileSync(unitDirectoryPath + file, 'utf8');
      data[file] = JSON.parse(contents);
    });
    return res.send(data);
  });
});

app.get('/factions', function(req, res) {
  return res.send(JSON.parse(fs.readFileSync(factionsFilePath)));
});

app.get('/unit/:cardName', function(req, res) {
  contents = fs.readFileSync(unitDirectoryPath + req.params.cardName, 'utf8');
  return res.send(JSON.parse(contents));
});

console.log(`server listening on port 3001`);
app.listen(3001);
