export const Ship = (length) => {
    const shipLength = length;
    const hitSpots = [];

    const hit = (x, y) => {
        hitSpots.push([x,y]);
    }
    const isSunk = () => {
        return hitSpots.length === shipLength;
    }
    return { hit, isSunk }
    
}

export const Gameboard = () => {
    const length = 4;
    const shipPlacement = new Array(length)
    const receivedAttacks = new Array(length);
    for (let i = 0; i < length; i++) {
        shipPlacement[i] = new Array(length).fill(0);
        receivedAttacks[i] = new Array(length).fill(0);
      }
    const ships = [];

    const placeShip = (length, xCoords, yCoords) => {
        const newShip = Ship(length);
        ships.push(newShip);

       xCoords.forEach(x => {
           yCoords.forEach(y => {
            shipPlacement[x][y] = newShip;
           })
       })
    }
    const receiveAttack =  (x, y) => {
        if(typeof shipPlacement[x][y] !== "object" ){
            receivedAttacks[x][y] = 'miss';
            return false;
        } else {
            receivedAttacks[x][y] = 'hit';
            shipPlacement[x][y].hit(x, y);
            return true;
        }
    }   

    const allShipsSunken = () => {
        return ships.every(ship => ship.isSunk() === true);
    }

    return {placeShip, gameBoard: shipPlacement, receiveAttack, allShipsSunken}
}

export const Player = () => {

    const madeMoves = new Array(4);
    for (let i = 0, length = madeMoves.length; i < length; i++) {
      madeMoves[i] = new Array(4).fill(false);
    }
    
    const attackEnemy = (enemy, x, y) => {
        madeMoves[x][y] = true;
        return enemy.gameBoard.receiveAttack(x, y);
    }
    return {madeMoves, attackEnemy}
}


export const Computer = () => {

    const madeMoves = new Array(4);
    for (let i = 0, length = madeMoves.length; i < length; i++) {
      madeMoves[i] = new Array(4).fill(false);
    }
    
    const attackEnemy = (enemy) => {
        const coords = randomMove();
        const x = coords[0];
        const y = coords[1];
        madeMoves[x][y] = true;
        const result = enemy.gameBoard.receiveAttack(x, y);
        return {result: result, x: x, y: y};

    }
    const randomMove = () => {
        let x, y;
        while(true){
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
            if(isMoveLegal(x,y)) break;
        }
        return ([x,y]);

    }
    const isMoveLegal = (x, y) => {
        if(madeMoves[x][y]){
            return false;
        }
        else return true;
    }

    return { attackEnemy, madeMoves}
}

