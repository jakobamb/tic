var BOARD_SIZE = 3;
//holds the current state of the board.
//fields are = 0 if empty, 1 if occupied by player 1, 2 if occupied by player 2
var board = {
    init: function() {
        //initializes an empty board
        this.state = [];
        for (var i = 0; i < 3; i++) {
            this.state[i] = [];
            for (var j = 0; j < 3; j++) {
                this.state[i][j] = 0;
                //clear board on screen
                $('#f' + (3 * j + i)).html("");
            }
        }
        console.log("board initilized");
    },
    getX: function(id) {
        //ids look like this: f1,f2... we want to get rid of the "f"
        id = id[1];
        return id % 3;
    },
    getY: function(id) {
        id = id[1];
        return Math.floor(id / 3);
    },
    //returns the id of a field, specified via x and y coordinates (like it is stored in the 2d array)
    getId: function(x, y) {
        return "f" + (x + 3 * y);
    },
    checkState: function(state) {
        var p1Count;
        var p2Count;
        var bothCount = 0;

        //check vertical
        for (var x = 0; x < 3; x++) {
            p1Count = 0;
            p2Count = 0;
            for (var y = 0; y < 3; y++) {
                if (state[y][x] === 1) {
                    p1Count++;
                    bothCount++;
                } else if (state[y][x] === 2) {
                    p2Count++;
                    bothCount++;
                }
            }
            if (p1Count === 3) {
                //p1wins
                return "p1win";
            } else if (p2Count === 3) {
                //p2wins
                return "p2win";
            }
        }

        //check horizontal
        for (var y = 0; y < 3; y++) {
            p1Count = 0;
            p2Count = 0;
            for (var x = 0; x < 3; x++) {
                if (state[y][x] === 1) {
                    p1Count++;
                } else if (state[y][x] === 2) {
                    p2Count++;
                }
            }
            if (p1Count === 3) {
                //p1wins
                return "p1win";
            } else if (p2Count === 3) {
                //p2wins
                return "p2win";
            }
        }

        //checkDiagonal
        //top left to bottom right
        p1Count = 0;
        p2Count = 0;
        for (var i = 0; i < 3; i++) {
            if (state[i][i] === 1) {
                p1Count++;
            } else if (state[i][i]) {
                p2Count++;
            }
        }
        if (p1Count === 3) {
            //p1wins
            return "p1win";
        } else if (p2Count === 3) {
            //p2wins
            return "p2win";
        }
        //top left to bottom right
        p1Count = 0;
        var p1CountB = 0;
        p2Count = 0;
        var p2CountB = 0;
        for (var i = 0; i < 3; i++) {
            if (state[i][2 - i] === 1) {
                p1Count++;
            } else if (state[i][2 - i] === 2) {
                p2Count++;
            }
            if (state[i][2 - i] === 1) {
                p1CountB++;
            } else if (state[i][2 - i] === 1) {
                p2CountB++;
            }
        }
        if (p1Count === 3 || p1CountB === 3) {
            //p1wins
            return "p1win";
        } else if (p2Count === 3 || p2CountB === 3) {
            //p2wins
            return "p2win";
        } else if (bothCount === 9) {
            //tie
            return "tie";
        }
    },
    printState: function(state) {
        console.log("board state:")
        for (var i = 0; i < 3; i++) {
            console.log(state[i]);
        }
    },
    gameOver : function(state) {
        return typeof(this.checkState(state)) === "string";
    },
    //place a marker on board and screen
    place : function(x,y,field) {
        //only set sign if field is empty
        if (board.state[y][x] === 0) {
            board.state[y][x] = turn;
            $(field).html((turn === 1 && p1char === "x") || (turn === 2 && p1char === "o") ?
                signCross : signCircle);
            board.state[board.getY($(this).attr("id"))][board.getX($(this).attr("id"))] = turn;
            //check if game over
            gameOver(board.checkState(board.state));
            //switch player turn
            turn = (turn === 1 ? 2 : 1);
        }
    }
};
