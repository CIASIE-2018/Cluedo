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
    getBoard() {
        return this.board;
    }
    placePlayer(id, x, y) {

        this.board[x][y] = this.board[x][y] + id;
    }
    getPositionPlayer(id) {
        let grille = this.getBoard();
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
        if (player.x + 1 == x && this.board[player.x + 1][player.y] != 'm') {
            this.board[player.x][player.y] = this.board[player.x][player.y].charAt(0);
            if (reg.test(this.board[player.x + 1][player.y])) {
                this.placementRoom(id, player.x + 1, player.y);
            } else {
                this.board[player.x + 1][player.y] = this.board[player.x + 1][player.y] + id;
            }
        } else if (player.x - 1 == x && this.board[player.x - 1][player.y] != 'm') {
            this.board[player.x][player.y] = this.board[player.x][player.y].charAt(0);
            if (reg.test(this.board[player.x - 1][player.y])) {
                this.placementRoom(id, player.x - 1, player.y);
            } else {
                this.board[player.x - 1][player.y] = this.board[player.x - 1][player.y] + id;
            }
        } else if (player.y + 1 == y && this.board[player.x][player.y + 1] != 'm') {
            this.board[player.x][player.y] = this.board[player.x][player.y].charAt(0);
            if (reg.test(this.board[player.x][player.y + 1])) {
                this.placementRoom(id, player.x, player.y + 1);
            } else {
                this.board[player.x][player.y + 1] = this.board[player.x][player.y + 1] + id;
            }
        } else if (player.y - 1 == y && this.board[player.x][player.y - 1] != 'm') {
            this.board[player.x][player.y] = this.board[player.x][player.y].charAt(0);
            if (reg.test(this.board[player.x][player.y - 1])) {
                this.placementRoom(id, player.x, player.y - 1);
            } else {
                this.board[player.x][player.y - 1] = this.board[player.x][player.y - 1] + id;
            }
        } else {
            this.CantMoveOnWall();
        }
    }


    // methode qui place les joueurs dans une salle

    placementRoom(id, x, y) {
        switch (this.board[x][y]) {
            case ('A'):
                this.board[1][id - 1] = this.board[1][id - 1] + id;
                break;
            case ('B'):
                this.board[1][8 + id] = this.board[1][8 + id] + id;
                break;
            case ('C'):
                this.board[3][16 + id] = this.board[3][16 + id] + id;
                break;
            case ('D'):
                this.board[11][7 + id] = this.board[11][7 + id] + id;
                break;
            case ('E'):
                this.board[21][17 + id] = this.board[21][17 + id] + id;
                break;
            case ('F'):
                this.board[21][8 + id] = this.board[21][8 + id] + id;
                break;
            case ('G'):
                this.board[21][id - 1] = this.board[21][id - 1] + id;
                break;
            case ('H'):
                this.board[14][id - 1] = this.board[14][id - 1] + id;
                break;
            case ('I'):
                this.board[7][id - 1] = this.board[7][id - 1] + id;
                break;

        }
    }


    CantMoveOnWall() {
        console.log("Tu ne peux pas te déplacer à travers les murs");
    }

    toString() {
        this.board.forEach(element => {
            console.log(element.toString())
        });
    }
}
module.exports = Board;