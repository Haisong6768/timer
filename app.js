const text = document.getElementById("text");

const onKeyPress = (e) => {
  console.log(e.key);
  text.innerText = e.key;
};

document.addEventListener("keydown", onKeyPress);
