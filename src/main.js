import './style.css';

const symbol = { cross: 'cross', null: 'null' };
const tiles = Array.from(document.getElementsByClassName('field__item'));

let currSymbol;

function init() {
  currSymbol = symbol.cross;
  tiles.forEach((t) => t.classList.add(currSymbol));
}

function toggleTileClass() {
  tiles.forEach((t) => {
    if (!t.classList.contains('crossed') && !t.classList.contains('nulled')) {
      t.classList.toggle('cross');
      t.classList.toggle('null');
    }
  });
}

function handleTileClick(e) {
  const { target } = e;

  if (
    target.classList.contains('crossed') ||
    target.classList.contains('nulled')
  ) {
    return;
  }

  target.classList.add(currSymbol === symbol.cross ? 'crossed' : 'nulled');
  currSymbol = currSymbol === symbol.cross ? symbol.null : symbol.cross;
  toggleTileClass();
}

tiles.forEach((t) => t.addEventListener('click', handleTileClick));

init();
