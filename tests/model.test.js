import {Ship, Gameboard, Player, Computer} from '../src/model'

describe("shipFactory", () => {

    test("creates a ship object", () => {
        const ship = Ship(4);
        const expected = {
            hit: (position) => {},
            isSunk: () => any,
        }
        expect(JSON.stringify(ship)).toBe(JSON.stringify(expected));
    })

    test("detects the ship is sunk", () =>{
        const ship = Ship(3);
        ship.hit(1);
        ship.hit(2);
        ship.hit(3);
        expect(ship.isSunk()).toBe(true);
    })
    test("detects the ship is not sunk", () =>{
        const ship = Ship(3);
        ship.hit(1);
        ship.hit(3);
        expect(ship.isSunk()).toBe(false);
    })

})

describe("gameboard factory", () => {

    test("places ship on board horizontaly", () => {
        const board = Gameboard();
        const newShip = Ship(2);
        const boardArr = [
            [0, newShip, newShip, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        board.placeShip(2, [0], [1,2]);
        expect(JSON.stringify(board.gameBoard)).toBe(JSON.stringify(boardArr))
    })
    test("places ship on board vertically", () => {
        const board = Gameboard();
        const newShip = Ship(2);
        const boardArr = [
            [0, 0, 0, 0], 
            [0, newShip, 0, 0], 
            [0, newShip, 0, 0],
            [0, 0, 0, 0],
        ];
        board.placeShip(2, [1,2], [1]);
        expect(JSON.stringify(board.gameBoard)).toBe(JSON.stringify(boardArr))
    })

    test("determines the attack hit a ship", () => {
        const board = Gameboard();
        const newShip = Ship(2);
        board.placeShip(2, [0], [1,2]);
        expect(board.receiveAttack(0,1)).toBe(true)
    })

    test('reports that all ships are sunk', () => {
        const board = Gameboard();
        board.placeShip(2, [0], [1,2]);
        board.placeShip(3, [1,2,3], [1]);
        board.receiveAttack(0,1);
        board.receiveAttack(0,2);
        board.receiveAttack(1,1);
        board.receiveAttack(2,1);
        board.receiveAttack(3,1);

        expect(board.allShipsSunken()).toBe(true);
    })
    test('reports that all ships are not sunk', () => {
        const board = Gameboard();
        board.placeShip(2, [0], [1,2]);
        board.placeShip(3, [1,2,3], [1]);
        board.receiveAttack(0,1);
        board.receiveAttack(0,2);
        board.receiveAttack(2,1);
        board.receiveAttack(3,1);

        expect(board.allShipsSunken()).toBe(false);
    })

})

describe("player", () => {
    test("player makes move", () => {
        const playerOne = Player();
        playerOne.gameBoard = Gameboard();
        const computer = Computer();
        computer.gameBoard = Gameboard();
        playerOne.attackEnemy(computer, 1, 2);
        expect(playerOne.madeMoves[1][2]).toBe(true)

    })
})