function Player(name,score){
    const players = {name,score};

    return {name,players,score};
}

function GameBoard(){

    const gameBoard =["","","","","","","","",""];

    let gameWon = false;
    let playerWon = "";
    

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

    function RefreshStatus(){

        const p1Status = document.querySelector(".p1Status");
        const p2Status = document.querySelector(".p2Status");

        const gameStatus = document.querySelector(".gameStatus");
        if(game.getTurn() % 2 == 1){
            gameStatus.textContent = game.Players().p1.name + "'s turn";
        }
        else{
            gameStatus.textContent = game.Players().p2.name + "'s turn";
        }

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
        else if (game.getTurn() == 8){
            gameStatus.textContent = "it is a draw!";
        }
    }

    return {gameBoard,checkWinCondition,DrawBoard,DrawStatus,RefreshStatus};
}

function Game(){

    let turn = 1;
    let p1;
    let p2;

    const board = GameBoard();

    const button = document.querySelector("#startGameButton");
    
    button.addEventListener("click",function(e){
        e.preventDefault();
        StartGame();
    });

    function StartGame(){
        CreatePlayers();
        board.DrawBoard();
        board.DrawStatus();
    }

    function CreatePlayers(){
        const labelP1 = document.querySelector("#name1");
        const labelP2 = document.querySelector("#name2");

        p1 = Player(labelP1.value,0);
        p2 = Player(labelP2.value,0);

    }

    function Players(){

        const incrementPlayer1Score = () => p1.score++;

        const incrementPlayer2Score = () => p2.score++;

        return {p1,p2,incrementPlayer1Score,incrementPlayer2Score};
    }

    const getTurn = () => turn;

    function incrementTurn(){
        turn++;
        board.checkWinCondition();
        board.RefreshStatus();
    }

    return{getTurn,incrementTurn,CreatePlayers,Players};
}

const game = Game();