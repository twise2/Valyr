const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
console.log('starting express server')
app.use(express.static(path.join(__dirname, 'build')));
//don't touch dirname before build
const directoryPath = path.join(__dirname + '../../../units/');


app.get('/units', function(req, res) {
  return fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    return res.send(files);
  });
});

app.get('/unit/:cardName', function(req, res) {
  contents = fs.readFileSync(directoryPath + req.params.cardName, 'utf8');
  return res.send(JSON.parse(contents))
});

console.log(`server listening on port ${process.env.PORT || 8080}`)
app.listen(process.env.PORT || 8080);
