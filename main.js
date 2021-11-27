const cells = document.getElementsByClassName("cell");
const status = document.getElementById("stat");
const restartBtn = document.getElementById("restart");
var count = 10;
var turn = 1;
var letter = "";
var indx = [
  [0, 3, 6],
  [0, 1, 2],
  [2, 5, 8],
  [6, 7, 8],
  [1, 4, 7],
  [3, 4, 5],
  [0, 4, 8],
  [2, 4, 6],
];

restartBtn.addEventListener("click", (e) => {
  letter = ["X", "O"][Math.floor(Math.random() * [1, 2].length)];
  turn = 1;
  start();
});

letter = ["X", "O"][Math.floor(Math.random() * [1, 2].length)];

start();

function start() {
  Array.from(cells).forEach((el) => {
    el.addEventListener("click", game, { once: true });
    el.addEventListener("mouseenter", hover);
    el.addEventListener("mouseleave", hover);

    el.innerHTML = "";
  });
  status.innerHTML = `Player ${turn}'s turn:  ${letter}`;
}

function game(e) {
  e.target.innerHTML = letter;
  e.target.removeEventListener("mouseenter", hover);
  e.target.removeEventListener("mouseleave", hover);
  //validations
  if (gameover() || !spaceAvailable()) {
    return start();
  }
  letter = letter == "X" ? "O" : "X";
  turn = turn == 1 ? 2 : 1;
  status.innerHTML = `Player ${turn}'s turn:  ${letter}`;
}

function spaceAvailable() {
  let boo = Array.from(cells).some((cell) => cell.innerHTML == "");
  if (!boo) {
    alert(`it is a draw`);
    return false;
  }
  return true;
}

function gameover() {
  let lis = indx
    .map((el) => el.map((ls) => document.getElementById(`${ls}`).innerHTML))
    .map((el) => new Set(el))
    .filter((el) => !el.has("") && el.size == 1);
  if (!lis.length == 0) {
    alert(`Player ${turn}(${letter}) has won  `);
    letter = ["X", "O"][Math.floor(Math.random() * [1, 2].length)];
    turn = 1;
    return true;
  }
}

function hover(e) {
  if (e.target.innerHTML == "" && e.type == "mouseenter") {
    e.target.innerHTML = letter;
  } else if (e.target.innerHTML !== "" && e.type == "mouseleave") {
    e.target.innerHTML = "";
  }
}
