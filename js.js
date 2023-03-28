const squares = document.querySelectorAll(".square");

const Player = (name, sign) => {
    return {name, sign};
}

const game = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let round = 0;

    const playerOne = Player("player1", "X");
    const playerTwo = Player("player2", "O");

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
                resetGame()
                return currentPlayer;
            }

            else if (round>=9) {resetGame()}
        }
    }
    
    
    squares.forEach(item => 
        item.addEventListener('click',() => {
            if (item.innerHTML) return;
                round++
                const currentPlayer = ( round % 2 === 1 ? playerOne : playerTwo)
                currentSign = currentPlayer.sign;
                item.innerHTML=currentSign;
                const index = item.dataset.index;
                board[index]=currentSign;
                winnerCheck(currentPlayer);
    }))
    return {round,board,squares}

})()


const resetGame = () => {
    window.location.reload(true);
}