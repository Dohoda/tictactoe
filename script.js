// Stores player names and scores

function Player(name,score){
    const players = {name,score};

    return {name,players,score};
}

// Everything visual goes here

function GameBoard(){

    const gameBoard =["","","","","","","","",""];

    let gameWon = false;
    let playerWon = "";
    
    // for checking every possible win combination and determining the winning side.

    function checkWinCondition(){ 

        // Horizontals

        for(let i = 0; i < 6; i += 3){
            if(gameBoard[i] == gameBoard[i+1] && gameBoard[i] == gameBoard[i+2] && gameBoard[i] != ""){
                gameWon = true;
                playerWon = gameBoard[i];
            }
        }

        // Verticals

        for(let i = 0; i < 3; i++){
            if(gameBoard[i] == gameBoard[i+3] && gameBoard[i] == gameBoard[i+6] && gameBoard[i] != ""){
                gameWon = true;
                playerWon = gameBoard[i];
            }
        }

        // Cross

        for(let i = 0; i < 2; i += 2){
            if( i == 0 && gameBoard[i] == gameBoard[i+4] && gameBoard[i] == gameBoard[i+8] && gameBoard[i] != ""){
                gameWon = true;
                playerWon = gameBoard[i];
            }
            else if( i == 2 && gameBoard[i] == gameBoard[i+2] && gameBoard[i] == gameBoard[i+4] && gameBoard[i] != ""){
                gameWon = true;
                playerWon = gameBoard[i];
            }
        }
    }

    // draws the tic tac toe board when initialized

    function DrawBoard(){

        const container = document.querySelector(".container");
        
        for(let i = 0; i < 9; i++){
            const box = document.createElement("div");
            box.classList.add("box");
            box.setAttribute("id",i);
            box.addEventListener("click",function(e){
                if(game.getTurn() % 2 == 1){
                    e.target.textContent = "X";
                    gameBoard[this.id] = "X";
                    game.incrementTurn();
                }
                else{
                    e.target.textContent = "O";
                    gameBoard[this.id] = "O";
                    game.incrementTurn();
                }
            },{once:true});
            container.appendChild(box);
        }
    }

    // draws the status display for the first time

    function DrawStatus(){
        const statusContainer = document.querySelector(".status-container");

        const p1Status = document.createElement("div");
        p1Status.classList.add("p1Status");
        statusContainer.appendChild(p1Status);

        const p2Status = document.createElement("div");
        p2Status.classList.add("p2Status");
        statusContainer.appendChild(p2Status);

        const gameStatus = document.createElement("div");
        gameStatus.classList.add("gameStatus");
        statusContainer.appendChild(gameStatus);

        p1Status.textContent = game.Players().p1.name + ": " + game.Players().p1.score;
        p2Status.textContent = game.Players().p2.name + ": " + game.Players().p2.score;
        gameStatus.textContent = game.Players().p1.name + "'s turn";

    }

    // refreshes the status display every turn

    function RefreshStatus(){

        const p1Status = document.querySelector(".p1Status");
        const p2Status = document.querySelector(".p2Status");

        const gameStatus = document.querySelector(".gameStatus");

        // displays which player's turn currently is.

        if(game.getTurn() % 2 == 1){
            gameStatus.textContent = game.Players().p1.name + "'s turn";
        }
        else{
            gameStatus.textContent = game.Players().p2.name + "'s turn";
        }

        // changes displays if a player wins.

        if(gameWon == true && playerWon == "X"){
            game.Players().incrementPlayer1Score();
            p1Status.textContent = game.Players().p1.name + ": " + game.Players().p1.score;
            gameStatus.textContent = game.Players().p1.name + " has won!";
        }
        else if(gameWon == true && playerWon == "O"){
            game.Players().incrementPlayer2Score();
            p2Status.textContent = game.Players().p2.name + ": " + game.Players().p2.score;
            gameStatus.textContent = game.Players().p2.name + " has won!";
        }
        else if (game.getTurn() == 10){
            gameStatus.textContent = "it is a draw!";
        }

        // if game is won calls the function to restart game board

        if(gameWon == true){
            RestartGameBoard();
        }
    }

    // resets the game board and re-initializes it

    function RestartGameBoard(){

        if(gameWon == true){
            gameWon = false;
            playerWon = "";

            gameBoard.forEach((element,index) => gameBoard[index] = "");

            const body = document.querySelector("body");

            const button = document.createElement("button");
            button.classList.add("restartButton");
            button.textContent = "Restart Board";

            // got rid of the container elements instantly cuz im too lazy to
            // actually remove the event that makes the grids clickable.

            const container = document.querySelector(".container");
            container.innerHTML = "";

            button.addEventListener("click",function(e){
                const gameStatus = document.querySelector(".status-container");
                gameStatus.innerHTML = "";
                game.RestartGame();
            });

            body.appendChild(button);
        }
    }

    return {gameBoard,checkWinCondition,DrawBoard,DrawStatus,RefreshStatus,RestartGameBoard};
}

// Everything that makes visuals work goes here

function Game(){

    let turn = 1;
    let p1;
    let p2;
    let gameStarted = false;

    const board = GameBoard();

    const button = document.querySelector("#startGameButton");
    
    button.addEventListener("click",function(e){
       if(gameStarted == false){
            e.preventDefault();
            StartGame();
            gameStarted = true;
        }
       else{
            e.preventDefault();
        }
    });

    // to initialize the game and call necessary functions.

    function StartGame(){
        CreatePlayers();
        board.DrawBoard();
        board.DrawStatus();
    }

    // restarts the game board and resets game information

    function RestartGame(){
        turn = 1;
        board.DrawBoard();
        board.DrawStatus();

        const restartButton = document.querySelector(".restartButton");
        restartButton.remove();
    }

    // creates players

    function CreatePlayers(){
        const labelP1 = document.querySelector("#name1");
        const labelP2 = document.querySelector("#name2");

        p1 = Player(labelP1.value,0);
        p2 = Player(labelP2.value,0);

    }

    // returns players' values and includes function to increase scores

    function Players(){

        const incrementPlayer1Score = () => p1.score++;

        const incrementPlayer2Score = () => p2.score++;

        return {p1,p2,incrementPlayer1Score,incrementPlayer2Score};
    }

    const getTurn = () => turn;

    // things that needs to be called every time the turn increases.

    function incrementTurn(){
        turn++;
        board.checkWinCondition();
        board.RefreshStatus();
    }

    return{getTurn,incrementTurn,CreatePlayers,Players,RestartGame};
}

const game = Game();