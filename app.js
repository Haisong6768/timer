const text = document.getElementById("text");
const regex = new RegExp("^[0-9]$");
let running = false;
let digits = [0, 0, 0, 0, 0, 0];
let seconds = 0;

const onKeyPress = (e) => {
  text.innerText = e.key;
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
      if (regex.test(key)) {
        console.log(parseInt(key));
      }
      break;
  }
}
function parseTime(seconds) {}
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
