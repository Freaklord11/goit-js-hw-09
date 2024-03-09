
const startBtn = document.querySelector('[data-start]');
const stpBtn = document.querySelector('[data-stop]');
let intervalId;

startBtn.addEventListener('click', startcolorChange);
stpBtn.addEventListener('click', stopcolorChange);
stpBtn.disabled=true;

// change color button
function startcolorChange(){
    intervalId = setInterval(setRandomColor, 1000);
    startBtn.disabled= true;
    stpBtn.disabled= false;
}

function setRandomColor(){
    document.body.style.backgroundColor = getRandomHexColor();
}
//stop button
function stopcolorChange(){
    clearInterval(intervalId);
    intervalId = null;
    startBtn.disabled = false;

}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }