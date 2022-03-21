const text = document.getElementById("time");
const timerDiv = document.getElementById("timer-overflow");
const explosion = document.getElementById("explosion");
const video = document.getElementById("video");
const audio = new Audio("./assets/audio.mp3");
const regex = new RegExp("^[0-9]$");
const beep = new Audio("./assets/beep.mp3");
const plant = new Audio("./assets/plant.mp3");
const defuse = new Audio("./assets/defuse.mp3");
let running = false;
let paused = false;
let bombing = false;
let digits = [0, 0, 0, 0, 0, 0];
let initialDigits = [];
let currentSecond = 0;
let timerInterval;

const onKeyPress = (e) => {
  parseKey(e.key);
};
document.addEventListener("keydown", onKeyPress);

function parseKey(key) {
  if (!bombing) {
    switch (key) {
      case "Backspace":
        onBackspace();
        break;
      case "Enter":
        onStart();
        break;
      case "x":
        onReset();
        break;
      case " ":
        togglePause();
        break;
      default:
        if (regex.test(key) && !running) {
          beep.currentTime = 0;
          beep.play();
          digits.push(parseInt(key));
          updateScreen();
        }
        break;
    }
  } else {
    video.pause();
    audio.pause();
    explosion.style.display = "none";
    timerDiv.style.display = "block";
    bombing = false;
    updateScreen();
  }
}
function updateScreen() {
  if (running) {
    text.innerText = parseTime(currentSecond);
  } else {
    text.innerText = `${
      digits[digits.length - 6].toString() +
      digits[digits.length - 5].toString()
    }:${
      digits[digits.length - 4].toString() +
      digits[digits.length - 3].toString()
    }:${
      digits[digits.length - 2].toString() +
      digits[digits.length - 1].toString()
    }`;
  }
}
function parseDigits() {
  let result =
    (digits[digits.length - 6] * 10 + digits[digits.length - 5]) * 3600 +
    (digits[digits.length - 4] * 10 + digits[digits.length - 3]) * 60 +
    (digits[digits.length - 2] * 10 + digits[digits.length - 1]);
  result = result >= 360000 ? 359999 : result;
  return result;
}
function parseTime(s) {
  let hours = Math.floor(s / 3600);
  let minutes = Math.floor((s % 3600) / 60);
  let seconds = Math.floor((s % 3600) % 60);
  hours = hours < 10 ? "0" + hours.toString() : hours.toString();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  return `${hours}:${minutes}:${seconds}`;
}
function onBackspace() {
  if (!running) {
    if (digits.length > 6) {
      digits.pop();
    }
    updateScreen();
  }
}
function onStart() {
  if (!running) {
    initialDigits = [0, 0, 0, 0, 0, 0].concat(digits.slice(-6));
    currentSecond = parseDigits();
    running = true;
    paused = false;
    if (currentSecond === 0) {
      endTimer();
    } else {
      plant.currentTime = 0;
      plant.play();
      updateScreen();
      startTimer();
    }
  }
}
function onReset() {
  if (running) {
    defuse.currentTime = 0;
    defuse.play();
    clearInterval(timerInterval);
    digits = initialDigits.slice();
    running = false;
  } else {
    digits = [0, 0, 0, 0, 0, 0];
  }
  updateScreen();
}
function togglePause() {
  if (running && paused) {
    startTimer();
    paused = false;
  } else if (running && !paused) {
    clearInterval(timerInterval);
    paused = true;
  }
}
function endTimer() {
  clearInterval(timerInterval);
  running = false;
}
function startTimer() {
  timerInterval = setInterval(() => {
    if (currentSecond === 0) {
      endTimer();
      explode();
    } else {
      currentSecond--;
      updateScreen();
    }
  }, 1000);
}
function explode() {
  bombing = true;
  timerDiv.style.display = "none";
  explosion.style.display = "block";
  video.currentTime = 0;
  video.play();
  audio.currentTime = 0;
  audio.play();
}

video.addEventListener("ended", () => {
  console.log("ended");
  explosion.style.display = "none";
  timerDiv.style.display = "block";
  bombing = false;
  updateScreen();
});
