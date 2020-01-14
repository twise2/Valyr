//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname+"./../units/");

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    console.log("Printing All Parsing Errors...")
    //listing all files using forEach
    files.forEach(function (file) {
        fs.readFile(directoryPath+file, 'utf8', function(err, contents) {
            //make sure it's valid json
            try {
              JSON.parse(contents);
            }
            catch(e){
              console.log(file)
              console.log(e)
            }
        });
    });
    console.log("Done.")
});
