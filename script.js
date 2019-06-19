let state = [[null, null, null], [null, null, null], [null, null, null]];
let players = ['x', 'o'];

function populate(board) {
  var table = document.getElementById('board');
  table.innerHTML = '';

  board.forEach((line, indexLine) => {
    //On créer une nouvelle ligne
    var newLine = document.createElement('tr');
    line.forEach((item, indexColumn) => {
      var newItem = document.createElement('td');
      newItem.textContent = item;
      newItem.addEventListener('click', () => {
        state[indexLine][indexColumn] = nextPlayer(state);
        populate(state);
        var currentPlayer = document.getElementById('current-player');
        currentPlayer.innerHTML = nextPlayer(state);
        var modal = document.getElementById('modal');
        var modalContent = document.getElementById('modal-content');
        const winner = findWinner(state);
        if (winner !== null) {
          modal.style.display = 'block';
          modalContent.innerHTML = ' Bravo, joueur ' + winner + ' vous avez gagné';
        }
        if (nextPlayer(state) === null) {
          modal.style.display = 'block';
          modalContent.innerHTML = ' La partie est finie';
        }
      });
      newLine.appendChild(newItem);
    });

    table.appendChild(newLine);
  });
}

function nextPlayer(board) {
  xCount = 0;
  oCount = 0;
  board.forEach(line => {
    line.forEach(item => {
      switch (item) {
        case 'x':
          xCount++;
          break;
        case 'o':
          oCount++;
          break;
        default:
          break;
      }
    });
  });
  if (xCount + oCount === 9) {
    return null;
  }
  if (oCount < xCount) {
    return 'o';
  }
  return 'x';
}

function findWinner(board) {
  let res = null;
  players.forEach(player => {
    if (
      (board[0][0] === player && board[0][1] === player && board[0][2] === player) ||
      (board[1][0] === player && board[1][1] === player && board[1][2] === player) ||
      (board[2][0] === player && board[2][1] === player && board[2][2] === player) ||

      (board[0][0] === player && board[1][0] === player && board[2][0] === player) ||
      (board[0][1] === player && board[1][1] === player && board[2][1] === player) ||
      (board[0][2] === player && board[1][2] === player && board[2][2] === player) ||

      (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
      (board[0][2] === player && board[1][1] === player && board[2][0] === player)


    ) {
      return (res = player);
    }
  });
  return res;
}

function resetGame() {
  const defaultState = [[null, null, null], [null, null, null], [null, null, null]];
  state = defaultState;
  populate(state);
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
  var currentPlayer = document.getElementById('current-player');
  currentPlayer.innerHTML = 'x';
}

function init() {
  populate(state);
}
