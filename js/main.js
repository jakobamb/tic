/**
TODO:

- ai should play when its her round (after tie)
- instant feedback
- back to menu -> change to original X/O headline

*/
"use strict";
//the gamemode
var mode; //1, if Singleplayer; 2 if MP
var p1char; //the "character" (x or o) of player 1
var turn = 1; //1, if player1 turn, 2 if player2
var clickLock = false; //lock to prevent player from placing 2x while the ai is
//computing the next step

//html code for cross and circle
var signCircle = '<div class="sign">&#9675</div>';
var signCross = '<div class="sign">&#215</div>';


/**
 *
 */
$(document).ready(function() {

    //gammemode selection (SP or MP)
    $('#1player').click(function() {
        mode = 1;
        charSelection();
    });
    $('#2player').click(function() {
        mode = 2;
        charSelection();
    });

    //character/sign selection
    $('.char-selector').click(function() {
        if (this.id === "char-x") {
            p1char = "x";
        } else {
            p1char = "o";
        }
        startGame();
    });

    //game field clicks
    $('.field').click(function() {
        if (!clickLock) {
            clickLock = true;
            //only set sign if field is empty
            place(board.getX($(this).attr("id")), board.getY($(this).attr("id")), this);

            //in 1player mode, ai plays:
            if (turn === 2 && mode === 1) {
                //export current gameState
                var game = {
                    state: board.state,
                    turn: turn
                }
                var choice = ai.getChoice(game);
                place(choice[1], choice[0], $("#" + board.getId(choice[1], choice[0]))[0]);
            }
            clickLock = false;
        }
    });

    //game over menu
    $('#gameover-restart').click(function() {
        startGame();
    });
    $('#gameover-back').click(function() {
        resetAll();
    });

    function place(x, y, field) {
        board.printState(board.state);
        console.log("Player " + turn + " placed at " + x + " : " + y);
        //only set sign if field is empty
        if (board.state[y][x] === 0) {
            board.state[y][x] = turn;
            $(field).html((turn === 1 && p1char === "x") || (turn === 2 && p1char === "o") ?
                signCross : signCircle);
            board.state[y][x] = turn;
            //check if game over
            gameOver(board.checkState(board.state));
            //switch player turn
            turn = (turn === 1 ? 2 : 1);
        }
    }

    /**
    the screen/menu where the player can select
    if they want to play as x or o.
    */
    function charSelection() {
        $('#logo').html('<h1>X || O?</h1>');
        //prepend Player 1: to the character selection menu to clarify who gets to choose
        if (mode === 2) {
            $('.mp-menu-only').css("display", "block")
        }
        $('.mode-selector').css("display", "none");
        $('.char-selector').css("display", "block");
        //"character" selection (x or o)
    }

    /**
    called each time a new game starts
    */
    function startGame() {
        console.log("game started");
        board.init();
        $('#logo, .menu').css("display", "none");
        $('.gameover-window').css("display", "none");
        $('.board').fadeIn(500);
        //if in Singleplayer mode and ai's turn, ai plays first
        if (mode === 1 && turn === 2) {
            clickLock = true;
            //export current gameState
            var game = {
                state: board.state,
                turn: turn
            }
            var choice = ai.getChoice(game);
            place(choice[1], choice[0], $("#" + board.getId(choice[1], choice[0]))[0]);
            clickLock = false;
        }
    }

    /**
    called at the end of each game

    result can be:
    p1win
    p2win
    tie
    */
    function gameOver(result) {
        //game is over when result is not null
        switch (result) {
            case "tie":
                $('.gameover-message').html("It's a tie!");
                $(".gameover-window").fadeIn(300);
                break;
            case "p1win":
                $('.gameover-message').html("Player 1 <br> wins!");
                $(".gameover-window").fadeIn(300);
                break;
            case "p2win":
                $('.gameover-message').html("Player 2 <br> wins!");
                $(".gameover-window").fadeIn(300);
                break;
        }
    }

    /**
    called when clicking "reset" in the game over menu
    */
    function resetAll() {
        $('.board').css("display", "none");
        $('.board , .gameover-window , .mp-menu-only, .char-selector').css("display", "none");
        $('.mode-selector').css("display", "block");
        $('#logo').html("<h1>XO</h1>");
        $('#logo').fadeIn(200);
        $('.menu').fadeIn(500);
    }
});
