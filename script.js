function Player(name,score){
    const players = {name,score};

    return {name,players,score};
}

function GameBoard(){

    const gameBoard =["","","","","","","","",""];

    function checkWinCondition(){ 

        // Horizontals

        for(let i = 0; i < 6; i += 3){
            if(gameBoard[i] == gameBoard[i+1] && gameBoard[i] == gameBoard[i+2] && gameBoard[i] != ""){
                console.log(gameBoard[i] + " won!");
            }
        }

        // Verticals

        for(let i = 0; i < 3; i++){
            if(gameBoard[i] == gameBoard[i+3] && gameBoard[i] == gameBoard[i+6] && gameBoard[i] != ""){
                console.log(gameBoard[i] + " won!");
            }
        }

        // Cross

        for(let i = 0; i < 2; i += 2){
            if( i == 0 && gameBoard[i] == gameBoard[i+4] && gameBoard[i] == gameBoard[i+8] && gameBoard[i] != ""){
                console.log(gameBoard[i] + " won!");
            }
            else if( i == 2 && gameBoard[i] == gameBoard[i+2] && gameBoard[i] == gameBoard[i+4] && gameBoard[i] != ""){
                console.log(gameBoard[i] + " won!");
            }
        }
    }

    return {gameBoard,checkWinCondition};
}

function Game(){

    const p1 = Player(p1Name,0);
    const p2 = Player(p2Name,0);
    
    const board = GameBoard();

    for(let gameTurn = 0; gameTurn < 9; gameTurn++){
        let p1Choice = prompt("P1 choice:");
        board.gameBoard[p1Choice] = "X";

        if(gameTurn > 1){
            board.checkWinCondition();
        }

        let p2Choice = prompt("P2 choice:");
        board.gameBoard[p2Choice] = "O";

        console.log(gameTurn);
        console.log(board.gameBoard);
    }
}

