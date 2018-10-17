//stand by
    const write = function (mess) {
        var fs = require("fs");
        fs.open('logs.txt', 'r+', function(err, fd) {
            if (err) {
               return console.error(err);
            }

        });

        fs.writeFile('logs.txt', mess,  function(err) {
            if (err) {
               return console.error(err);
            }
            
            console.log("Data written successfully!");
            console.log("Let's read newly written data");
            fs.readFile('input.txt', function (err, data) {
               if (err) {
                  return console.error(err);
               }
               console.log("Asynchronous read: " + data.toString());
            });
         });

                
        fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("File closed successfully.");
         });
    }
    
    const read = function () {
        var fs = require("fs");
        var buf = new Buffer(1024);

        console.log("Going to open an existing file");
        fs.open('logs.txt', 'r+', function(err, fd) {
           if (err) {
              return console.error(err);
           }
           console.log("File opened successfully!");
           console.log("Going to read the file");
           
           fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
              if (err){
                 console.log(err);
              }
        
              // Print only read bytes to avoid junk.
              if(bytes > 0){
                 console.log(buf.slice(0, bytes).toString());
              }
        
              // Close the opened file.
              fs.close(fd, function(err){
                 if (err){
                    console.log(err);
                 } 
                 console.log("File closed successfully.");
              });
           });
        });
    }

    const kill = function() {
        var fs = require("fs");
        fs.unlink('logs.txt', function(err) {
            if (err) {
               return console.error(err);
            }
            console.log("File deleted successfully!");
         });
    }


module.exports = {read, write, kill};

//fs