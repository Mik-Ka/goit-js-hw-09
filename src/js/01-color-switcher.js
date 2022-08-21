function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let interval = null;
const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
function startChangeColor() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  interval = setInterval(changeColor, 1000);
  // console.log ("Start")
}
function stopChangeColor() {
  clearInterval(interval);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  // console.log("Stop")
}
