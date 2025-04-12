import './style.css';
import restartLogo from '/restart.svg';

const symbol = { cross: 'x', null: 'o' };
let field = new Array(9).fill(undefined);
const tiles = Array.from(document.getElementsByClassName('field__item'));
const result = document.getElementById('result');
const restart = document.getElementById('restart');

let currSymbol;
let winner;

function init() {
  currSymbol = symbol.cross;
  winner = undefined;
  field = new Array(9).fill(undefined);

  tiles.forEach((t) => (t.className = 'field__item cross'));
  result.textContent = 'Result';
  restart.textContent = 'Tic Tac Toe';
  restart.classList.remove('info__restart');
}

function toggleTileClass() {
  tiles.forEach((t) => {
    if (!t.classList.contains('crossed') && !t.classList.contains('nulled')) {
      t.classList.toggle('cross');
      t.classList.toggle('null');
    }
  });
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] !== undefined &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function setWinner(win) {
  winner = win;
  result.textContent = `${winner.toUpperCase()} Win`;
  restart.innerHTML = `<img alt="restart logo" src=${restartLogo} /> Restart`;
  restart.classList.add('info__restart');
}

function handleTileClick(e) {
  if (winner) return;

  const { target } = e;
  const tileId = target.getAttribute('data-id');

  if (
    target.classList.contains('crossed') ||
    target.classList.contains('nulled')
  ) {
    return;
  }

  target.classList.add(currSymbol === symbol.cross ? 'crossed' : 'nulled');
  field[tileId] = currSymbol;
  const win = calculateWinner(field);

  if (win) {
    setWinner(win);
    return;
  }

  toggleTileClass();
  currSymbol = currSymbol === symbol.cross ? symbol.null : symbol.cross;
}

function handleRestart() {
  if (winner) init();
}

tiles.forEach((t) => t.addEventListener('click', handleTileClick));
restart.addEventListener('click', handleRestart);

init();
