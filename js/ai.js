var ai = {
    //holds the 3x3 adress of where to place in this round
    choice: null,
    score: function(state) {
        var gameState = board.checkState(state);
        if (gameState === "p1win") {
            return -10;
        } else if (gameState === "p2win") {
            return 10;
        } else {
            return 0;
        }
    },
    getAvailableMoves: function(state) {
        var moves = [];
        for (var x = 0; x < BOARD_SIZE; x++) {
            for (var y = 0; y < BOARD_SIZE; y++) {
                if (state[y][x] === 0) {
                    moves.push([y, x]);
                }
            }
        }
        return moves;
    },
    getNewState: function(game, move) {
        //create a new game object holding the boards state and players turn
        var newGame = {
            //switch turn
            turn: game.turn === 1 ? 2 : 1
        };
        //create a copy of the state and place a 1 at the coordinates specified in move
        newGame.state = [
            game.state[0].slice(0),
            game.state[1].slice(0),
            game.state[2].slice(0)
        ];
        newGame.state[move[0]][move[1]] = game.turn;
        return newGame;
    },
    minimax: function(game) {
        //game object passed as arg
        // {state : *state-as-2d-array*, turn : current turn}
        if (board.gameOver(game.state)) {
            return this.score(game.state);
        }

        var scores = []; //array of scores
        var moves = []; //array of moves

        //populate the scores array, recursing as needed
        var availableMoves = this.getAvailableMoves(game.state);
        for (var i = 0; i < availableMoves.length; i++) {
            //max calculation
            var possibleGame = this.getNewState(game, availableMoves[i]);
            scores.push(this.minimax(possibleGame));
            moves.push(availableMoves[i]);
        }

        //do min or max calculation
        if (game.turn === 2) {
            var maxIndex = getMaxIndex(scores);
            this.choice = moves[maxIndex];
            return scores[maxIndex];
        } else {
            var minIndex = getMinIndex(scores);
            this.choice = moves[minIndex];
            return scores[minIndex];
        }
    },
    getChoice: function(game) {
        this.minimax(game);
        console.log("best calculated placement: " + this.choice);
        return this.choice;
    },
    play: function() {
        //export current gameState
        var game = {
            state: board.state,
            turn: turn
        }
        var choice = ai.getChoice(game);
        place(choice[1], choice[0], $("#" + board.getId(choice[1], choice[0]))[0]);
    }
};
