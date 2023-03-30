//DOM elements
const squares = document.querySelectorAll(".square");
const button = document.querySelector("#button");
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
    let winnerDeclared = false;
    const playerOne = Player("player X", "X");
    const playerTwo = Player("player O", "O");
    

    const render = () => { for (let i=0; i<board.length ; i++){
        squares[i].innerHTML = board[i];
    }}
    
    const restartGame = () => {
        round=0;
        board = ["", "", "", "", "", "", "", "", ""];
        render();
        turn.innerHTML = "";
        turn.innerHTML = "It is playerX's turn";
        winnerDeclared = false;
        squares.forEach(item => item.style.backgroundColor="rgb(190,217,232)")
        button.style.backgroundColor = "rgb(43, 38, 116)";
        turn.style.color = "rgb(43, 38, 116)";
        turn.style.fontSize = "25px";
        turn.style.textShadow = "none"
    }

    button.addEventListener("click",restartGame);

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
                squares[condition[0]].style.backgroundColor="rgb(79, 174, 174)";
                squares[condition[1]].style.backgroundColor="rgb(79, 174, 174) ";
                squares[condition[2]].style.backgroundColor="rgb(79, 174, 174)  ";
                button.style.backgroundColor="rgb(79, 174, 174)  ";
                turn.innerHTML = "";
                turn.innerHTML = `The winner is ${currentPlayer.name}!`;
                turn.style.fontSize = "30px";
                turn.style.color = "rgb(175,76,0)";
                turn.style.textShadow = "1px 1px white"
                winnerDeclared = true;
            }}}

     
    const roundCheck = (round) => {
            if (round>=9) {
                winnerDeclared = true;
                turn.innerHTML = "";
                turn.innerHTML = `It is a tie!`;
                button.style.backgroundColor="rgb(79, 174, 174) ";
                turn.style.fontSize = "30px";
                turn.style.color = "rgb(175,76,0) ";
                turn.style.textShadow = "1px 1px white"
            }
        }

    
    squares.forEach(item => 
        item.addEventListener('click',() => {
            if (item.innerHTML !="" || winnerDeclared == true) return;
                console.log(winnerDeclared)
                round++
                const currentPlayer = ( round % 2 === 1 ? playerOne : playerTwo);
                if (currentPlayer == playerOne) {item.style.color=" rgb(175,76,0) "}
                else {item.style.color = " rgb(209,126,49) " };
                const nextPlayer = ( round % 2 === 1 ? playerTwo : playerOne);
                turn.innerHTML = "";
                turn.innerHTML = `It is ${nextPlayer.name}'s turn`;
                currentSign = currentPlayer.sign;
                const index = item.dataset.index;
                board[index]=currentSign;
                render();
                winnerCheck(currentPlayer);
                roundCheck(round);

    }))
    return {round, board, restartGame}
})()