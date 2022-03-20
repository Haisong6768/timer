const text = document.getElementById("text");
const regex = new RegExp("^[0-9]$");

const onKeyPress = (e) => {
  console.log();
  text.innerText = e.key;
  switch (e.key) {
    case "Backspace":
      onBackspace();
      break;
    case "Enter":
      onStart();
      break;
    default:
      if (regex.test(e.key)) {
        console.log(parseInt(e.key));
      }
      break;
  }
};

document.addEventListener("keydown", onKeyPress);

function onClear() {
  console.log("clear");
}

function onStart() {
  console.log("start");
}

function onBackspace() {
  console.log("backspace");
}
