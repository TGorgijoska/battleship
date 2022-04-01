
export const renderComputerBoard = (onclick) => {
    const length = 4;
    const div = document.querySelector('.gameboards');
    const boardDiv = document.createElement('div');
    boardDiv.className = 'board';
    boardDiv.setAttribute('id', 'computer');
    let piece;
    for(let x = 0; x < length; x++){
        for(let y = 0; y < length; y++){     
            piece = renderPiece(x, y)
            piece.addEventListener('click', onclick); 
            boardDiv.appendChild(piece);
        }
    }
    div.appendChild(boardDiv);
}
export const renderUserBoard = (board) => {
    const length = 4;
    const div = document.querySelector('.gameboards');
    const boardDiv = document.createElement('div');
    boardDiv.className = 'board';
    boardDiv.setAttribute('id', 'user')
    let piece;

    for(let x = 0; x < length; x++){
        for(let y = 0; y < length; y++){
            if(typeof board[x][y] == "object" ){ 
                piece = renderPiece(x, y, 'ship');
            }
            else {
                piece = renderPiece(x, y);
            }            
            boardDiv.appendChild(piece);
        }

    }
    div.appendChild(boardDiv);
}

const renderPiece = (x, y, ship) => {
    const pieceDiv = document.createElement('div');
    pieceDiv.classList.add('piece');
    if(ship) pieceDiv.classList.add('ship');
    pieceDiv.dataset.x = x; 
    pieceDiv.dataset.y = y;
 
    return pieceDiv;
}

export const renderHitPiece = (piece, hit) => {
    hit ? piece.classList.add('hit') : piece.classList.add('miss');
}

export const gameOver = (winner) => {
    alert(`${winner} won`);
}