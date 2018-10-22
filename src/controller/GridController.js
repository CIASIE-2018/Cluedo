class GridController {

    //constuit le plateau à partir d'un txt
    constructor() {
        const fs = require("fs");
        var contents = fs.readFileSync("src/controller/grid.txt", 'utf8');
        let i = 0;
        let x = 0;
        let y = 0;
        this.grid = new Array(25);
        this.grid[y] = new Array(25)
        while (i < contents.length) {
            if (contents[i] == '\n') {
                y++;
                this.grid[y] = new Array(x)
                x = 0;
            } else {
                this.grid[y][x] = contents[i];
                x++;
            }
            i++;
        }
    }
    getGrid() {
        return this.grid;
    }
    placePlayer(id, x, y) {
        this.grid[x][y]=this.grid[x][y]+id;
    }
    getPositionPlayer(id) {
        let grille = this.getGrid();
        for (let i = 0; i <= 24; i++) {
            for (let j = 0; j <= 24; j++) {
                if(grille[i][j].length == 2 && grille[i][j].charAt(1) == id){
                    return { x: i, y: j };
                }
            }
        }
    }
<<<<<<< HEAD

    movePlayer(id, x, y) {
        let player = this.getPositionPlayer(id);
        if (player.x + 1 == x && this.grid[player.x+1][player.y]!='m') {
            this.grid[player.x][player.y]=this.grid[player.x][player.y].charAt(0);
            this.grid[player.x+1][player.y]=this.grid[player.x+1][player.y]+id;

        }else{
            this.fdp;
        }
        if (player.x - 1 == x && this.grid[player.x-1][player.y]!='m') {
            this.grid[player.x][player.y]=this.grid[player.x][player.y].charAt(0);
            this.grid[player.x-1][player.y]=this.grid[player.x-1][player.y]+id;

        }else{
            this.fdp;
        }
        if (player.y + 1 == y && this.grid[player.x][player.y+1]!='m') {
            this.grid[player.x][player.y]=this.grid[player.x][player.y].charAt(0);
            this.grid[player.x][player.y+1]=this.grid[player.x][player.y+1]+id;

        }else{
            this.fdp;
        }
        if (player.y - 1 == y && this.grid[player.x][player.y-1]!='m') {
            this.grid[player.x][player.y]=this.grid[player.x][player.y].charAt(0);
            this.grid[player.x+1][player.y]=this.grid[player.x+1][player.y]+id;

        }else{
            this.fdp;
        }
    }

    fdp(){
        console.log("gros fdp");
    }

    //methode pour un lancer deux dés a 6 faces
    rollTheDice() {
        let d1 = Math.floor(Math.random() * 6) + 1;
        let d2 = Math.floor(Math.random() * 6) + 1;
        let somme = d1 + d2;
        return { somme }
    }

    toString() {
=======
   getGrid(){
       return this.grid;
   }
   placePlayer(id,x,y){
    this.grid[x][y]=this.grid[x][y]+id;
}
    toString(){
>>>>>>> 00101fa0f36c70ee47db44748b6557abfdd272b0
        this.grid.forEach(element => {
            console.log(element.toString())
        });
    }
}
module.exports = GridController;
