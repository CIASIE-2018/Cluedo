class Grid {
    contructor(){
        const read = function () {
            var fs = require("fs");
            var buf = new Buffer(1024);
    
            console.log("Going to open an existing file");
            fs.open('grid.txt', 'r+', function(err, fd) {
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
    }
}
module.exports = GridController;