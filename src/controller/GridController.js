class GridController {
    constructor() {
        const fs = require("fs");
        var contents = fs.readFileSync("src/controller/grid.txt", 'utf8');

        this.grille = new Array();
        for (var i = 0; i < 25; i++)
            this.grille[i] = new Array();

        for (var i = 0; i < 25; i++)
            for (var j = 0; j < 25; j++)
                if (contents[i] != '\n') {
                    this.grille[i][j] = contents[i];
                }
    }
}
module.exports = GridController;



        /*
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
        this.grid.forEach(element => {
            console.log(element.toString())
        });
        */

