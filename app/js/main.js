/**
TODO:

- check for diagonal
- Game over screen w/ "go back"-functionality
- AI

*/
"use strict";
//the gamemode
var mode; //1, if Singleplayer; 2 if MP
var p1char; //the "character" (x or o) of player 1
var turn = 1;//1, if player1 turn, 2 if player2

//html code for cross and circle
var signCircle = '<div class="sign">&#9675</div>';
var signCross = '<div class="sign">&#215</div>';

//holds the current state of the board.
//fields are = 0 if empty, 1 if occupied by player 1, 2 if occupied by player 2
var board = {
  init : function() {
    //initializes an empty board
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this[i][j] = 0;
      }
    }
    //clear board on screen
    $('#f' + i).html("");
  },
  //returns the value of a field, specified via id (see html)
  getFieldById : function(id) {
    //convert string id into int
    id = parseInt(id[1]);
    if(id < 3) {
      return this[0][id];
    } else if (id < 6) {
      return this[1][id-3];
    } else {
      return this[2][id-6];
    }
  },
  //returns the id of a field, specified via x and y coordinates (like it is stored in the 2d array)
  getId : function(x,y) {
    return "f" + (x + 3*y);
  },
  checkState : function() {
    var p1Count;
    var p2Count;
    console.log("vert");
    //check vertical
    for (var i = 0; i < 4; i++) {
      p1Count = 0;
      p2Count = 0;
      for (var j = i; j < i+7; j+=3) {
        if(this["f"+j] === 1) {
          p1Count++;
        } else if (this["f"+j] === 2) {
          p2Count++;
        }
        if (p1Count === 3) {
          //p1wins
          return gameOver("p1win");
        } else if(p2Count === 3) {
          //p2wins
          return gameOver("p2win");
        }
      }
    }
    //check diagonal
    console.log("diag");
    for (var i = 2; i <= 4; i+=2) {
      p1Count = 0;
      p2Count = 0;
      for (var j = 4-i; j <= 4-i + i*2; j+=i) {
        if(this["f"+j] === 1) {
          p1Count++;
        } else if (this["f"+j] === 2) {
          p2Count++;
        }
      }
      if (p1Count === 3) {
        return gameOver("p1win");
      } else if (p2Count === 3) {
        return gameOver("p2win");
      }
    }

    //check horizontal
    var bothCount = 0;
    for (var i = 0; i <= 6; i+=3) {
      p1Count = 0;
      p2Count = 0;

      for (var j = i; j <= i + 2; j++) {
        if(this["f"+j] === 1) {
          p1Count++;
          bothCount++;
        } else if (this["f"+j] === 2) {
          p2Count++;
          bothCount++;
        }
        if (p1Count === 3) {
          //p1wins
          return gameOver("p1win");
        } else if(p2Count === 3) {
          //p2wins
          return gameOver("p2win");
        }
      }
      if (bothCount === 9) {
        //its a tie
        return gameOver("tie");
      }
    }
  },
}


/**

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
  $('.field').click(function(){
    //only set sign if field is empty
    if($(this).html() === ""){
      $(this).html((turn === 1 && p1char === "x") || (turn === 2 && p1char === "o")
                   ? signCross : signCircle);
      board[$(this).attr("id")] = turn;
      //check if game over
      board.checkState();
      //switch player turn
      turn = (turn === 1 ? 2 : 1);
    }
  });
  //game over menu
  $('#gameover-restart').click(function() {
    startGame();
  });
  $('#gameover-back').click(function() {
    resetAll();
  });
});
/**
the screen/menu where the player can select
if they want to play as x or o.
*/
function charSelection() {
  $('#logo').html('<h1>X || O?</h1>');
  //prepend Player 1: to the character selection menu to clarify who gets to choose
  if(mode === 2){$('.mp-menu-only').css("display","block")}
  $('.mode-selector').css("display","none");
  $('.char-selector').css("display", "block");
  //"character" selection (x or o)
}

function startGame(){
  board.init();
  $('#logo, .menu').css("display","none");
  $('.gameover-window').css("display", "none");
  $('.board').fadeIn(500);
}

/**
called at the end of each game

result can be:
p1win
p2win
tie
*/
function gameOver(result) {
  switch(result) {
    case "tie":
      $('.gameover-message').html("It's a tie!");
      break;
    case "p1win":
      $('.gameover-message').html("Player 1 <br> wins!");
      break;
    case "p2win":
      $('.gameover-message').html("Player 2 <br> wins!");
      break;
               }
  $(".gameover-window").fadeIn(300);
}

function resetAll() {
  $('.board').css("display", "none");
  $('.board , .gameover-window , .mp-menu-only, .char-selector').css("display", "none");
  $('.mode-selector').css("display", "block");
  $('#logo').fadeIn(200);
  $('.menu').fadeIn(500);
}
