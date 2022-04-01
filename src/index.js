import {Gameboard, Player, Computer} from "./model";
import * as UI from "./view";

const Game = (() => {
    const user = Player();
    const computer = Computer();
    // create computer board
    const computerBoard = Gameboard();
    computerBoard.placeShip(2, [0], [1,2]);
    computerBoard.placeShip(3, [1,2,3], [1]);
    computer.gameBoard = computerBoard;
    // create user board
    const userBoard = Gameboard();
    userBoard.placeShip(2, [0], [1,2]);
    userBoard.placeShip(3, [1,2,3], [1]);
    user.gameBoard = userBoard;
    // render boards on page
    UI.renderComputerBoard(handleUserMove);
    UI.renderUserBoard(userBoard.gameBoard);

    function handleUserMove (e) {
        const x = e.target.dataset.x;
        const y = e.target.dataset.y;
        // makes attack and gets whether a boat a hit
        const result = user.attackEnemy(computer, x, y);
        // renders image on the piece
        UI.renderHitPiece(e.target, result);
        // if there r no winners its computers turn
        if(!checkForWinner()) computerTurn();
    }

    const computerTurn = () => {
        const result = computer.attackEnemy(user);
        const board = document.querySelector('[id="user"]');
        const xNodes = board.querySelectorAll(`[data-x="${result.x}"]`)
        const yNode = [...xNodes].filter(el => el.dataset.y == result.y)
        const piece = yNode[0];
        UI.renderHitPiece(piece, result.result);
        checkForWinner();
    }


    const checkForWinner = () => {
        if(computerBoard.allShipsSunken()) {
            UI.gameOver('user'); 
            return true;
        }
        if(userBoard.allShipsSunken()){ 
            UI.gameOver('computer');
            return true; 
        }
        return false;
    }

})();

