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

    function DrawBoard(){

        const container = document.querySelector(".container");
        
        for(let i = 0; i < 9; i++){
            const box = document.createElement("div");
            box.classList.add("box");
            box.setAttribute("id","cell" + i);
            container.appendChild(box);
        }
    }

    return {gameBoard,checkWinCondition,DrawBoard};
}

function Game(){

    const labelP1 = document.querySelector("#name1");
    const labelP2 = document.querySelector("#name2");

    let p1Name = "";
    let p1Score = 0;
    let p2Name = "";
    let p2Score = 0;

    const button = document.querySelector("#startGameButton");
    
    button.addEventListener("click",function(e){
        e.preventDefault();
        p1Name = labelP1.textContent;
        p2Name = labelP2.textContent;
        StartGame();
    });
  

    function StartGame(){

        const p1 = Player(p1Name,0);
        const p2 = Player(p2Name,0);
    
        const board = GameBoard();
        board.DrawBoard();
    }
}

Game();
