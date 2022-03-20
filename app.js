const text = document.getElementById("text");
const regex = new RegExp("^[0-9]$");
let running = false;
let digits = [0, 0, 0, 0, 0, 0];
let seconds = 0;

const onKeyPress = (e) => {
  parseKey(e.key);
  console.log(digits);
};
document.addEventListener("keydown", onKeyPress);

function updateScreen(s) {
  text.innerText = parseTime(parseInt(s));
}
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
      if (regex.test(key)) {
        console.log(parseInt(key));
        digits.push(parseInt(key));
        updateScreen(key);
      }
      break;
  }
}
function parseDigits() {
  let result =
    (digits[digits.length - 6] * 10 + digits[digits.length - 5]) * 3600 +
    (digits[digits.length - 4] * 10 + digits[digits.length - 3]) * 60 +
    (digits[digits.length - 2] * 10 + digits[digits.length - 1]);
  return result;
}
function parseTime(_s) {
  let s = _s >= 360000 ? 359999 : _s;
  let hours = Math.floor(s / 3600);
  let minutes = Math.floor((s % 3600) / 60);
  let seconds = Math.floor((s % 3600) % 60);
  hours = hours < 10 ? "0" + hours.toString() : hours.toString();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  return `${hours}:${minutes}:${seconds}`;
}
function onBackspace() {
  console.log("backspace");
}
function onStart() {
  console.log("start");
}
function togglePause() {
  console.log("toggle pause");
}
function onClear() {
  console.log("clear");
}
function onReset() {
  console.log("reset");
}
