const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/units', function(req, res) {
  const directoryPath = path.join(__dirname + "../../../units/");
  let data = [];
  fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    console.log('Printing All Parsing Errors...');
    //listing all files using forEach
    files.forEach(function(file) {
      contents = fs.readFileSync(directoryPath + file, 'utf8')
      data.push(JSON.parse(contents));
    });
    return res.send(data);
  });
});

app.listen(process.env.PORT || 8080);
