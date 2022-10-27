const Player = (name, mark) => {
    this.name = name
    this.mark = mark

    const getMark = () => {
        return mark
    }

    const getName = () => {
        return name
    }

    return {getMark, getName}
}

const GameBoard = (() => {
    let board = new Array(9).fill("")

    const setMark = (index, mark) => {
        return board[index] = mark
    }

    const getMark = (index) => {
        return board[index]
    }
    const getBoard = () => {
        return board
    }

    const resetBoard = () => {
        for (let i=0; i < board.length; i++){
            board[i] = ""
        }
    }

    return {
        setMark,
        getMark,
        getBoard, 
        resetBoard,
        board

    }
})()

const DisplayController = (() => {

    function displayTurn(player){
        return `It's ${player}'s turn.`
    }

    function displayMark(mark){
        return `${mark}`
    }

    function displayWinner(winner){
        if (winner == "draw") {
            return "It's a draw !"
        } else {
            return `${winner} won.`
        }
    }

    return {displayMark, displayTurn, displayWinner}

})()


const GameController = (() => {
    let isPlaying = true
    let currentMark = "X"
    let board = GameBoard.getBoard()
    const winConditions = 
        [[0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7], 
        [2,5,8],
        [0,4,8],
        [2,4,6]]

    const cells = document.querySelectorAll(".cell")
    const restartButton = document.getElementById("restart")
    const gameStatus = document.getElementById("status")

    cells.forEach(cell => cell.addEventListener("click", (e) => play(e)))

    function play(e){
        if (isPlaying){
            if (e.target.textContent == ""){
                e.target.textContent = DisplayController.displayMark(currentMark)
                let index  = e.target.dataset.cell
                GameBoard.setMark(index, currentMark)
                checkWin()
                console.log(board)
            }
        }   
    }
    
    function restartGame(){
        currentMark = "X"
        gameStatus.innerHTML = DisplayController.displayTurn(currentMark)
        isPlaying = true
        GameBoard.resetBoard()

        cells.forEach(cell => cell.textContent = "")
    }

    function switchPlayer(){
        return currentMark = currentMark  == "X" ? "O" : "X"
    }

    function checkWin(){
        let isWon = false
        for(win of winConditions){
            let cellChecked1 = board[win[0]]
            let cellChecked2 = board[win[1]]
            let cellChecked3 = board[win[2]]

            if (cellChecked1=="" || cellChecked2 =="" || cellChecked3 ==""){
                continue
            }
            if ((cellChecked1 == cellChecked2) && (cellChecked2 == cellChecked3)){
                isWon = true
                break
            }
        }
        if (isWon){
            gameStatus.textContent = DisplayController.displayWinner(currentMark)
            isPlaying = false
            return 
        }
        if (!board.includes("")){
            gameStatus.textContent = DisplayController.displayWinner("draw")
            isPlaying = false
            return 
        } else {
            switchPlayer()
            gameStatus.textContent = DisplayController.displayTurn(currentMark)
        } 
        return
    }

    restartButton.addEventListener("click", restartGame)

    return {board}

})()

// GameController.restartGame()