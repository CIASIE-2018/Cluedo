class Board {

    //constuit le plateau à partir d'un txt
    constructor() {
        const fs = require("fs");
        var contents = fs.readFileSync("src/board.txt", 'utf8');
        let i = 0;
        let x = 0;
        let y = 0;
        this.board = new Array(25);
        this.board[y] = new Array(25)
        while (i < contents.length) {
            if (contents[i] == '\n') {
                y++;
                this.board[y] = new Array(x)
                x = 0;
            } else {
                this.board[y][x] = contents[i];
                x++;
            }
            i++;
        }
    }
    getGrid() {
        return this.board;
    }
    placePlayer(id, x, y) {

        this.board[x][y] = this.board[x][y] + id;
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
            if (reg.test(this.grid[player.x - 1][player.y])) {
                this.placementRoom(id, player.x - 1, player.y);
            } else {
                this.grid[player.x - 1][player.y] = this.grid[player.x - 1][player.y] + id;
            }
        } else {
            this.fdp;
        }
        if (player.y + 1 == y && this.grid[player.x][player.y + 1] != 'm') {
            this.grid[player.x][player.y] = this.grid[player.x][player.y].charAt(0);
            if (reg.test(this.grid[player.x][player.y + 1])) {
                this.placementRoom(id, player.x, player.y + 1);
            } else {
                this.grid[player.x][player.y + 1] = this.grid[player.x][player.y + 1] + id;
            }


        } else {
            this.fdp;
        }

        if (player.y - 1 == y && this.grid[player.x][player.y - 1] != 'm') {
            this.grid[player.x][player.y] = this.grid[player.x][player.y].charAt(0);
            if (reg.test(this.grid[player.x][player.y - 1])) {
                this.placementRoom(id, playeur.x, player.y - 1);
            } else {
                this.grid[player.x + 1][player.y] = this.grid[player.x + 1][player.y] + id;
            }
        } else {
            this.fdp;
        }
    }


    // methode qui place les joueurs dans une salle

    placementRoom(id, x, y) {
        switch (this.grid[x][y]) {
            case ('A'):
                this.grid[0][id - 1] = this.grid[0][id - 1] + id;
                break;
            case ('B'):
                this.grid[id - 1][10] = this.grid[id - 1][10] + id;
                break;
            case ('C'):
                this.grid[id - 1][19] = this.grid[id - 1][19] + id;
                break;
            case ('D'):
                this.grid[8 + id][19] = this.grid[9][19] + id;
                break;
            case ('E'):
                this.grid[18 + id][20] = this.grid[18 + id][20] + id;
                break;
            case ('F'):
                this.grid[16 + id][12] = this.grid[16 + id][12] + id;
                break;
            case ('G'):
                this.grid[2 + id][19] = this.grid[2 + id][19] + id;
                break;
            case ('H'):
                this.grid[2 + id][12] = this.grid[2 + id][12] + id;
                break;
            case ('I'):
                this.grid[2 + id][6] = this.grid[2 + id][6] + id;
                break;

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
        this.board.forEach(element => {
            console.log(element.toString())
        });
    }
}
module.exports = Board;
