class GridController {
    constructor(){
            const fs = require("fs");
            var contents = fs.readFileSync("src/controller/grid.txt", 'utf8');
            let i = 0;
            let x = 0;
            let y = 0;
            this.grid= new Array(25);
            grid[y]= new Array(25)
            while(i<contents.length){
                if(contents[i]=='\n'){
                    y++;
                    grid[y]= new Array(x)
                    x=0;
                }else{
                    grid[y][x] = contents[i];
                    x++;
                }
                i++;
            }
            grid.forEach(element => {
                console.log(element.toString())
            });
    }
}
module.exports = GridController;