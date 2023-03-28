//DOM elements
const squares = document.querySelectorAll(".square");
const button = document.querySelector("#button");
const winner = document.querySelector("#winner");
const big_container = document.querySelector(".big_container");
const turn = document.querySelector(".turn")

//the players
const Player = (name, sign) => {
    return {name, sign};
}

//the game
const game = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let round = 0;

    const render = () => { for (let i=0; i<board.length ; i++){
        squares[i].innerHTML = board[i];
    }}
    
    const restartGame = () => {
        round=0;
        board = ["", "", "", "", "", "", "", "", ""];
        render();
        button.style.visibility = "hidden";
        winner.style.visibility = "hidden";
        big_container.classList.remove("blur");
    }
    
    button.addEventListener("click",restartGame);

    const resetGame = () => {
        button.style.visibility = "visible";
        winner.style.visibility = "visible";
        big_container.classList.add("blur");
    }

    const playerOne = Player("player X", "X");
    const playerTwo = Player("player O", "O");

    const winnerCheck = (currentPlayer) => {

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (condition of winningConditions) {
            if (board[condition[0]] == board[condition[1]]&& board[condition[1]] == board[condition[2]]&&
                board[condition[0]] != ''){
                resetGame();
                winner.innerHTML = `The winner is ${currentPlayer.name}`;
                console.log(currentPlayer);
            }

            else if (round>=9) {
                resetGame()
                winner.innerHTML = `It is a tie!`;
            }
        }
    }
    
    squares.forEach(item => 
        item.addEventListener('click',() => {
            if (item.innerHTML) return;
                round++
                const currentPlayer = ( round % 2 === 1 ? playerOne : playerTwo);
                const nextPlayer = ( round % 2 === 1 ? playerTwo : playerOne);
                turn.innerHTML = "";
                turn.innerHTML = `It is ${nextPlayer.name}'s turn`;
                currentSign = currentPlayer.sign;
                const index = item.dataset.index;
                board[index]=currentSign;
                render()
                winnerCheck(currentPlayer);
    }))
    return {round, board, restartGame}

})()




