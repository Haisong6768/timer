const text = document.getElementById("text");
const regex = new RegExp("^[0-9]$");
let running = false;
let paused = false;
let digits = [0, 0, 0, 0, 0, 0];
let initialDigits = [];
let currentSecond = 0;
let timerInterval;

const onKeyPress = (e) => {
  parseKey(e.key);
};
document.addEventListener("keydown", onKeyPress);

function parseKey(key) {
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
        digits.push(parseInt(key));
        updateScreen();
      }
      break;
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
    console.log("start");
    initialDigits = [0, 0, 0, 0, 0, 0].concat(digits.slice(-6));
    running = true;
    paused = false;
    currentSecond = parseDigits();
    if (currentSecond === 0) {
      endTimer();
    } else {
      startTimer();
    }
  }
}
function onReset() {
  console.log("reset");
  if (running) {
    clearInterval(timerInterval);
  }
  digits = initialDigits.slice();
  running = false;
  updateScreen();
}
function togglePause() {
  if (running && paused) {
    console.log("resume");
    startTimer();
    paused = false;
  } else {
    clearInterval(timerInterval);
    paused = true;
  }
}
function endTimer() {
  console.log("EXPLOSION!!!");
  clearInterval(timerInterval);
  running = false;
}
function startTimer() {
  console.log("timer started");
  timerInterval = setInterval(() => {
    currentSecond--;
    if (currentSecond === 0) {
      endTimer();
    }
    updateScreen();
  }, 1000);
}
