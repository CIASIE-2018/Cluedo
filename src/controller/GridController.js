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
        this.grid[x][y] = this.grid[x][y] + id;
    }
    getPositionPlayer(id) {
        let grille = this.getGrid();
        for (let i = 0; i <= 24; i++) {
            for (let j = 0; j <= 24; j++) {
                if (grille[i][j].length == 2 && grille[i][j].charAt(1) == id) {
                    return { x: i, y: j };
                }
            }
        }
    }

    movePlayer(id, x, y) {
        let reg = new RegExp('[A-I]');// reg ex pour tester les lettre
        let player = this.getPositionPlayer(id);
        if (player.x + 1 == x && this.grid[player.x + 1][player.y] != 'm') {
            this.grid[player.x][player.y] = this.grid[player.x][player.y].charAt(0);
            if (reg.test(this.grid[player.x + 1][player.y])) {
                this.placementRoom(id, player.x + 1, player.y);
            } else {
                this.grid[player.x + 1][player.y] = this.grid[player.x + 1][player.y] + id;
            }
        } else {
            this.fdp;

        }
        if (player.x - 1 == x && this.grid[player.x - 1][player.y] != 'm') {
            this.grid[player.x][player.y] = this.grid[player.x][player.y].charAt(0);
            if ( reg.test(this.grid[player.x - 1][player.y])) {
                this.placementRoom(id, player.x - 1, player.y);
            } else {
                this.grid[player.x - 1][player.y] = this.grid[player.x - 1][player.y] + id;
            }
        } else {
            this.fdp;
        }
        if (player.y + 1 == y && this.grid[player.x][player.y + 1] != 'm') {
            this.grid[player.x][player.y] = this.grid[player.x][player.y].charAt(0);
            if (reg.test(this.grid[player.x][player.y+1])) {
                this.placementRoom(id, player.x, player.y + 1);
            }else{
                this.grid[player.x][player.y + 1] = this.grid[player.x][player.y + 1] + id;
            }

        } else {
            this.fdp;
        }
        if (player.y - 1 == y && this.grid[player.x][player.y - 1] != 'm') {
            this.grid[player.x][player.y] = this.grid[player.x][player.y].charAt(0);
            if (reg.test(this.grid[player.x][player.y-1])) {
                this.placementRoom(id, playeur.x, player.y - 1);
            }else{
                this.grid[player.x + 1][player.y] = this.grid[player.x + 1][player.y] + id;
            }
        } else {
            this.fdp;
        }
    }

    // methode qui place les joueurs dans une salle

    placementRoom(id, x, y) {
        if (this.grid[x][y] === 'A') {
            if (id === 1) {
                this.grid[0][0] = this.grid[0][0] + id;
            }
            if (id === 2) {
                this.grid[0][1] = this.grid[0][1] + id;
            }
            if (id === 3) {
                this.grid[0][2] = this.grid[0][2] + id;
            }
            if (id === 4) {
                this.grid[0][3] = this.grid[0][3] + id;
            }
            if (id === 5) {
                this.grid[0][4] = this.grid[0][4] + id;
            }
            if (id === 6) {
                this.grid[0][5] = this.grid[0][5] + id;
            }
        }
        if (this.grid[x][y] === 'B') {
            if (id === 1) {
                this.grid[0][10] = this.grid[0][10] + id;
            }
            if (id === 2) {
                this.grid[1][10] = this.grid[1][10] + id;
            }
            if (id === 3) {
                this.grid[2][10] = this.grid[2][10] + id;
            }
            if (id === 4) {
                this.grid[3][10] = this.grid[3][10] + id;
            }
            if (id === 5) {
                this.grid[4][10] = this.grid[4][10] + id;
            }
            if (id === 6) {
                this.grid[5][10] = this.grid[5][10] + id;
            }
        }
        if (this.grid[x][y] === 'C') {
            if (id === 1) {
                this.grid[0][19] = this.grid[0][19] + id;
            }
            if (id === 2) {
                this.grid[1][19] = this.grid[1][19] + id;
            }
            if (id === 3) {
                this.grid[2][19] = this.grid[2][19] + id;
            }
            if (id === 4) {
                this.grid[3][19] = this.grid[3][19] + id;
            }
            if (id === 5) {
                this.grid[4][19] = this.grid[4][19] + id;
            }
            if (id === 6) {
                this.grid[5][19] = this.grid[5][19] + id;
            }
        }
        if (this.grid[x][y] === 'D') {
            if (id === 1) {
                this.grid[9][19] = this.grid[9][19] + id;
            }
            if (id === 2) {
                this.grid[10][19] = this.grid[10][19] + id;
            }
            if (id === 3) {
                this.grid[11][19] = this.grid[11][19] + id;
            }
            if (id === 4) {
                this.grid[12][19] = this.grid[12][19] + id;
            }
            if (id === 5) {
                this.grid[13][19] = this.grid[14][19] + id;
            }
            if (id === 6) {
                this.grid[14][19] = this.grid[14][19] + id;
            }
        }
        if (this.grid[x][y] === 'E') {
            if (id === 1) {
                this.grid[19][20] = this.grid[19][20] + id;
            }
            if (id === 2) {
                this.grid[20][20] = this.grid[20][20] + id;
            }
            if (id === 3) {
                this.grid[21][20] = this.grid[21][20] + id;
            }
            if (id === 4) {
                this.grid[22][20] = this.grid[22][20] + id;
            }
            if (id === 5) {
                this.grid[23][20] = this.grid[23][20] + id;
            }
            if (id === 6) {
                this.grid[24][20] = this.grid[24][20] + id;
            }
        }
        if (this.grid[x][y] === 'F') {
            if (id === 1) {
                this.grid[17][12] = this.grid[17][12] + id;
            }
            if (id === 2) {
                this.grid[18][12] = this.grid[18][12] + id;
            }
            if (id === 3) {
                this.grid[19][12] = this.grid[19][12] + id;
            }
            if (id === 4) {
                this.grid[20][12] = this.grid[20][12] + id;
            }
            if (id === 5) {
                this.grid[21][12] = this.grid[21][12] + id;
            }
            if (id === 6) {
                this.grid[22][12] = this.grid[22][12] + id;
            }
        }
        if (this.grid[x][y] === 'G') {
            if (id === 1) {
                this.grid[3][19] = this.grid[3][19] + id;
            }
            if (id === 2) {
                this.grid[4][19] = this.grid[4][19] + id;
            }
            if (id === 3) {
                this.grid[5][19] = this.grid[5][19] + id;
            }
            if (id === 4) {
                this.grid[6][19] = this.grid[6][19] + id;
            }
            if (id === 5) {
                this.grid[7][19] = this.grid[7][19] + id;
            }
            if (id === 6) {
                this.grid[8][19] = this.grid[8][19] + id;
            }
        }
        if (this.grid[x][y] === 'H') {
            if (id === 1) {
                this.grid[3][12] = this.grid[3][12] + id;
            }
            if (id === 2) {
                this.grid[4][12] = this.grid[4][12] + id;
            }
            if (id === 3) {
                this.grid[5][12] = this.grid[5][12] + id;
            }
            if (id === 4) {
                this.grid[6][12] = this.grid[6][12] + id;
            }
            if (id === 5) {
                this.grid[7][12] = this.grid[7][12] + id;
            }
            if (id === 6) {
                this.grid[8][12] = this.grid[8][12] + id;
            }
        }
        if (this.grid[x][y] === 'B') {
            if (id === 1) {
                this.grid[3][6] = this.grid[3][6] + id;
            }
            if (id === 2) {
                this.grid[4][6] = this.grid[4][6] + id;
            }
            if (id === 3) {
                this.grid[5][6] = this.grid[5][6] + id;
            }
            if (id === 4) {
                this.grid[6][6] = this.grid[6][6] + id;
            }
            if (id === 5) {
                this.grid[7][6] = this.grid[7][6] + id;
            }
            if (id === 6) {
                this.grid[8][6] = this.grid[8][6] + id;
            }
        }


    }

    fdp() {
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
        this.grid.forEach(element => {
            console.log(element.toString())
        });
    }
}
module.exports = GridController;
