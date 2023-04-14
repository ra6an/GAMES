const display = document.querySelector(".display-scr");
const btn = document.querySelectorAll(".btn");

let record = [];
let result = 0;
let enter = false;

btn.forEach((b) =>
  b.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.id;
    const el = e.target;
    const numberArray = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "dot",
    ];
    const operatorArray = ["addition", "subtract", "multiply", "division"];

    if (id === "c") {
      display.textContent = 0;
      record = [];
      result = 0;
      enter = false;
    }

    if (numberArray.includes(id)) {
      if (display.textContent === "0" && el.id !== "dot") {
        display.textContent = el.dataset.set;
      } else if (display.textContent !== "0" && el.id !== "dot") {
        display.textContent = display.textContent + el.dataset.set;
      }

      if (el.id === "dot" && !display.textContent.includes(".") && !enter) {
        display.textContent = display.textContent + ".";
      }
    }

    if (operatorArray.includes(id)) {
      record[0] = display.textContent;
      record[1] = el.dataset.set;
      display.textContent = "0";
      enter = false;
    }

    if (id === "equals") {
      if (record[1] === "+") {
        if (enter === false) {
          result = (Number(record[0]) + Number(display.textContent)).toFixed(2);
          record[0] = display.textContent;
        } else {
          result = (Number(result) + Number(record[0])).toFixed(2);
        }
      }
      if (record[1] === "-") {
        if (enter === false) {
          result = (Number(record[0]) - Number(display.textContent)).toFixed(2);
          record[0] = display.textContent;
        } else {
          result = (Number(result) - Number(record[0])).toFixed(2);
        }
      }
      if (record[1] === "*") {
        if (enter === false) {
          result = (Number(record[0]) * Number(display.textContent)).toFixed(2);
          record[0] = display.textContent;
        } else {
          result = (Number(result) * Number(record[0])).toFixed(2);
        }
      }
      if (record[1] === "/") {
        if (enter === false) {
          result = (Number(record[0]) / Number(display.textContent)).toFixed(2);
          record[0] = display.textContent;
        } else {
          result = (Number(result) / Number(record[0])).toFixed(2);
        }
      }
      display.textContent = Number.isInteger(Number(result))
        ? Number(result).toFixed(0)
        : result;
      enter = true;
    }
  })
);

// ////////////////////////////////////////////////////////////////////////////////
// TIK TAK TOE ////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

let currentPlayer = "x";
let haveWinner = false;
let winner;
// filed elements
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");

const allFields = document.querySelectorAll(".tik-tak-toe-field");
const restartBtn = document.getElementById("restart-btn");

const checkIfPlayerIsWinner = (player) => {
  const onePl = one.dataset.player;
  const twoPl = two.dataset.player;
  const threePl = three.dataset.player;
  const fourPl = four.dataset.player;
  const fivePl = five.dataset.player;
  const sixPl = six.dataset.player;
  const sevenPl = seven.dataset.player;
  const eightPl = eight.dataset.player;
  const ninePl = nine.dataset.player;

  const setWinner = () => {
    const winnerContainer = document.querySelector(".winner-container");
    const winnerText = document.querySelector(".winner-text");

    haveWinner = true;
    winner = player;

    winnerText.textContent = `${player} is winner!!!`;
    winnerContainer.classList.remove("hidden");
  };

  // 1,2,3
  if (onePl === player && twoPl === player && threePl === player) {
    setWinner();
  }
  // 4,5,6
  if (fourPl === player && fivePl === player && sixPl === player) {
    setWinner();
  }
  // 7,8,9
  if (sevenPl === player && eightPl === player && ninePl === player) {
    setWinner();
  }
  // 1,4,7
  if (onePl === player && fourPl === player && sevenPl === player) {
    setWinner();
  }
  // 2,5,8
  if (twoPl === player && fivePl === player && eightPl === player) {
    setWinner();
  }
  // 3,6,9
  if (threePl === player && sixPl === player && ninePl === player) {
    setWinner();
  }
  // 1,5,9
  if (onePl === player && fivePl === player && ninePl === player) {
    setWinner();
  }
  // 3,5,7
  if (threePl === player && fivePl === player && sevenPl === player) {
    setWinner();
  }
};

allFields.forEach((field) =>
  field.addEventListener("click", (e) => {
    e.preventDefault();

    // add dataset to field
    if (!e.target.dataset.player && haveWinner === false) {
      e.target.dataset.player = currentPlayer;

      checkIfPlayerIsWinner(currentPlayer);

      currentPlayer === "x"
        ? e.target.classList.add("player-x")
        : e.target.classList.add("player-o");

      currentPlayer = currentPlayer === "x" ? "o" : "x";
    }
  })
);

restartBtn.addEventListener("click", (e) => {
  currentPlayer = "x";
  haveWinner = false;
  winner = "";

  allFields.forEach((field) => {
    field.dataset.player = "";
    field.classList.remove("player-x");
    field.classList.remove("player-o");
  });

  const winnerContainer = document.querySelector(".winner-container");
  winnerContainer.classList.add("hidden");
});

// //////////////////////////////////////////////////////////////////////////
// PRECISION GAME ///////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////

const startBtn = document.querySelector(".btn-start");
const restartBtnPG = document.querySelector(".btn-restart--PG");
const blocks = document.querySelectorAll(".block");
const finnishDiv = document.querySelector(".game-finnish");
const finnish = document.querySelector(".finnish");
const gameContainer = document.querySelector(".game-container");
const gameOver = document.querySelector(".game-over");
const gameWait = document.querySelector(".game-wait");
const gameBody = document.querySelector(".game-body");

let gameStarted = false;

const gameOverFn = () => {
  gameOver.textContent = "game over";
  gameOver.style.color = "#fff";
  gameOver.style.backgroundColor = "rgba(59,59,59,0.808)";
  gameOver.classList.remove("hidden");
  gameContainer.style.cursor = "";
  finnish.style.backgroundColor = "#333";
  finnish.style.cursor = "cursor";
  restartBtnPG.classList.remove("hidden");
  gameStarted = false;
};

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gameStarted = true;
  gameBody.classList.remove("hidden");
  gameWait.classList.add("hidden");
  finnish.style.backgroundColor = "rgb(211, 17, 17)";
  finnish.classList.remove("hidden");

  gameContainer.addEventListener("mouseleave", (e) => {
    e.preventDefault();
    if (gameStarted) {
      gameOverFn();
    }
  });

  const startBtnTarget = e.target;
  gameContainer.style.cursor = "crosshair";

  startBtnTarget.classList.add("hidden");
  finnishDiv.style.backgroundColor = "rgba(240, 240, 240, 0.61)";

  blocks.forEach((b) => {
    b.addEventListener("mouseenter", (e) => gameOverFn());
  });

  finnishDiv.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      gameStarted &&
      (e.target.classList.contains("finnish") ||
        e.target.classList.contains("game-finnish"))
    ) {
      if (finnish.textContent === "end") {
        gameOver.classList.remove("hidden");
        gameOver.textContent = "congratulation!!!";
        gameOver.style.backgroundColor = "rgba(255,255,255,0.808)";
        gameOver.style.color = "#333";
        gameStarted = false;
        restartBtnPG.classList.remove("hidden");
      }
    }
  });
});

restartBtnPG.addEventListener("click", (e) => {
  e.preventDefault();

  restartBtnPG.classList.add("hidden");
  startBtn.classList.remove("hidden");
  gameOver.classList.add("hidden");
  gameBody.classList.add("hidden");
  gameWait.classList.remove("hidden");
  finnish.classList.add("hidden");
  finnishDiv.style.backgroundColor = "rgb(145, 132, 167)";
});

// ///////////////////////////////////////////////////////////////////////////
// REFLEX GAME ///////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

const reflexGameCont = document.querySelector(".reflex-game-container");
const reflexDisplay = document.querySelector(".reflex-game--display");
const reflexBtnStart = document.querySelector(".start");
const reflexBtnStop = document.querySelector(".stop");

let seconds = 0.0;
let num = 0.0;
let randomNumber = 0;
let currTime = 0;
let finnishTime = 0;
let gameEnded = true;
let pause;
let timer;

const resetGame = () => {
  seconds = 0.0;
  randomNumber = 0;
  currTime = 0;
  finnishTime = 0;
  gameEnded = true;
  pause;
  timer;
  reflexBtnStart.classList.remove("hidden");
  reflexBtnStop.classList.add("hidden");
};

reflexBtnStart.addEventListener("click", (e) => {
  e.preventDefault();

  gameEnded = false;
  num = 0;
  reflexDisplay.textContent = num.toFixed(3);
  reflexBtnStart.classList.add("hidden");
  reflexBtnStop.classList.remove("hidden");
  reflexGameCont.style.backgroundColor = "rgba(255, 255, 255, 0.122)";

  currTime = Date.now();
  randomNumber = (Math.random() * 10).toFixed(3);

  if (randomNumber < 1) {
    randomNumber = 1;
  }

  finnishTime = currTime + randomNumber * 1000;

  pause = setTimeout(() => {
    reflexGameCont.style.backgroundColor = "rgba(98, 201, 121, 0.5)";

    timer = setInterval(() => {
      num = (Date.now() - finnishTime) / 1000;
      reflexDisplay.textContent = num.toFixed(3);
    }, 1);
  }, randomNumber * 1000);
});

reflexBtnStop.addEventListener("click", (e) => {
  e.preventDefault();

  if (Date.now() < finnishTime) {
    reflexGameCont.style.backgroundColor = "rgba(245, 94, 89, 0.5)";
    reflexDisplay.textContent = "TOO SOON!!!";
    clearTimeout(pause);
    clearInterval(timer);
    resetGame();
  } else {
    clearInterval(timer);
    resetGame();
  }
});

// PROBA

class novaKlasa {
  constructor(num_one, num_two, operation) {
    this.num_one = num_one;
    this.num_two = num_two;
    this.operation = operation;
    this.result = 0;
  }

  subtraction() {
    return this.num_one - this.num_two;
  }

  addition() {
    return this.num_one + this.num_two;
  }

  multiplication() {
    return this.num_one * this.num_two;
  }

  division() {
    return this.num_one / this.num_two;
  }

  calculate() {
    console.log("radi calc");
    if (this.operation === "multiply") {
      this.result = this.multiplication();
    } else if (this.operation === "subtract") {
      this.result = this.subtraction();
    } else if (this.operation === "divide") {
      this.result = this.division();
    } else if (this.operation === "addition") {
      console.log(this.num_one + this.num_two);
      // this.result = this.addition();
    }
  }
}

const firstCalc = new novaKlasa(25, 5, "addition");
// const resultCalc = firstCalc.calculate();
// console.log(firstCalc.result);

const obj1 = {
  numOne: 5,
  numTwo: 3,
  operation: "addition",
  calc: function () {
    console.log("radi");
    console.log(this.numOne + this.numTwo);
  },
};

const obj2 = {
  numOne: 15,
  numTwo: 5,
  operation: "addition",
};

obj1.calc();
obj1.calc.apply(obj2);
obj2.calc();

// const test = document.querySelector(".test-two");

// test.addEventListener("mouseover", (e) => {
//   e.preventDefault();

//   e.target.style.backgroundColor = "rgb(0,0,0)";
//   console.log("pali");
// });

// test.addEventListener("mouseout", (e) => {
//   e.preventDefault();

//   e.target.style.backgroundColor = "rgb(109, 191, 238)";
//   console.log("gasi");
// });
