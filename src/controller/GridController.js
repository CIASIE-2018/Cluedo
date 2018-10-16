class GridController {
    constructor() {
        const fs = require("fs");
        var contents = fs.readFileSync("src/controller/grid.txt", 'utf8');

        var i = 0;
        var y = 0;
        var x = 0;

        this.grid= new Array(25);
        this.grid[y]= new Array(25);
        while(i<contents.length){
            if(contents[i]=='\n'){
                y++;
                this.grid[y]= new Array(x);
                x=0;
            }else{
                this.grid[y][x] = contents[i];
                x++;
            }
            i++;
        }
    }
}
module.exports = GridController;
