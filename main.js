const game = document.getElementById("gamecontainer");
const clock = document.getElementById("show");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progressBarFull");
var questionNum = 1;
var score = 0;
var data;
var interval;

async function fetchJson() {
  res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple"
  );
  r = await res.json();
  data = shuffle(r["results"]);
  interval = setInterval(() => {
    timer();
    timekeeper();
  }, 1000);
  display(data[questionNum - 1]);
}

function display(question) {
  console.log(question.correct_answer);
  let questionText = `<h2 id="quesiton">${question["question"]}</h2>`;
  let choices = createChoices(question);
  progressText.innerHTML = `Question ${questionNum}/${data.length}`;
  game.innerHTML = questionText + choices;
  addEvent(true);
  makeProgress();
}

function createChoices(question) {
  let output = "";
  let answers = shuffle([
    ...question.incorrect_answers,
    question.correct_answer,
  ]);
  let choiceNum = 1;
  for (const i in answers) {
    output += `<div class="choice-container" >
      <p class="choice-prefix"></p>
      <p class="choice-text" data=${choiceNum}>${answers[i]}</p>
    </div>`;
    choiceNum++;
  }
  return output;
}

function addEvent(bool) {
  const choiceContainers = document.getElementsByClassName("choice-container");
  Array.from(choiceContainers).forEach((el) => {
    if (bool) {
      el.addEventListener("click", check);
    } else el.removeEventListener("click", check);
  });
}

function check(e) {
  let choice = e.target;
  let currentQuestion = data[questionNum - 1];
  let ans = currentQuestion.correct_answer;
  if (choice.innerHTML == ans) {
    choice.classList.add("correct");
    score++;
    scoreText.innerHTML = score;
  } else choice.classList.add("incorrect");

  addEvent(false);
  setTimeout(NextQuestion, 1500);
}

function NextQuestion() {
  if (data.length > questionNum) {
    questionNum++;
    let question = data[questionNum - 1];
    display(question);
  } else {
    alert("you have finished the quiz");
    clearInterval(interval);
  }
}
function timer() {
  const time = clock.innerHTML.split(":").map((el) => parseInt(el));

  if (time[1] == 00) {
    time[0] -= 1;
    time[1] = 59;
  } else {
    time[1] -= 1;
  }
  clock.innerHTML = time
    .map((s) => {
      s = s.toString();
      return s.length > 1 ? s : "0" + s;
    })
    .join(":");
}

function timekeeper() {
  const time = clock.innerHTML.split(":").map((el) => parseInt(el));
  if (time[1] == 0 && time[0] == 0) {
    clearInterval(interval);
    alert("you have run out of time");
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function makeProgress() {
  let width = Math.floor((questionNum / data.length) * 100);
  progressBar.style.width = width + "%";
}

fetchJson();
