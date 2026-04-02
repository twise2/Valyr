import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
console.log('starting express server');
app.use(express.static(path.join(__dirname, 'build')));

const unitDirectoryPath = path.join(__dirname, '../../units/');
const factionsFilePath = path.join(__dirname, '../../factions.json');

app.use('/templates', express.static(path.join(__dirname, 'templates')));

app.get('/unitNames', function (req, res) {
  return fs.readdir(unitDirectoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    return res.send(files);
  });
});

app.get('/units', function (req, res) {
  let data = {};
  fs.readdir(unitDirectoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const contents = fs.readFileSync(path.join(unitDirectoryPath, file), 'utf8');
      data[file] = JSON.parse(contents);
    });
    return res.send(data);
  });
});

app.get('/factions', function (req, res) {
  return res.send(JSON.parse(fs.readFileSync(factionsFilePath, 'utf8')));
});

app.get('/unit/:cardName', function (req, res) {
  const contents = fs.readFileSync(
    path.join(unitDirectoryPath, req.params.cardName),
    'utf8',
  );
  return res.send(JSON.parse(contents));
});

console.log('server listening on port 3001');
app.listen(3001);
