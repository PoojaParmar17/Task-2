// script.js
let timer, isRunning = false, seconds = 0, minutes = 0, hours = 0, lapTimes = [];

const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const timeDisplay = document.getElementById("time-display");
const lapList = document.getElementById("lap-list");

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateTimeDisplay() {
    timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = "Start";
    } else {
        timer = setInterval(updateTime, 1000);
        startStopButton.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateTimeDisplay();
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapTimes = [];
    updateTimeDisplay();
    startStopButton.textContent = "Start";
    lapList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        lapTimes.push(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

// Event Listeners (Important: Add these after the function definitions)
startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);