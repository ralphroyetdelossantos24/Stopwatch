// THEME CHANGER LOGIC
const themeToggle = document.getElementById('theme-toggle');
const colorThemeBtn = document.getElementById('color-theme');
const colorPicker = document.getElementById('color-picker');

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        themeToggle.textContent = 'Light';
    } else if (theme === 'color') {
        themeToggle.textContent = 'Light';
    } else {
        themeToggle.textContent = 'Dark';
    }
}

themeToggle?.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    if (current === 'dark' || current === 'color') {
        setTheme(''); // light
    } else {
        setTheme('dark');
    }
});

colorThemeBtn?.addEventListener('click', () => {
    colorPicker.click();
});

colorPicker?.addEventListener('input', (e) => {
    const color = e.target.value;
    // Set custom color variables for color theme
    document.body.style.setProperty('--custom-bg', color + '22');
    document.body.style.setProperty('--custom-card', color + '44');
    document.body.style.setProperty('--custom-text', '#222');
    document.body.style.setProperty('--custom-yellow', color);
    document.body.style.setProperty('--custom-blue', color);
    document.body.style.setProperty('--custom-black', '#222');
    document.body.style.setProperty('--custom-goggle', color);
    setTheme('color');
});

// Set initial theme
setTheme('');
// Elements
const displayMin = document.getElementById('display-min');
const displaySec = document.getElementById('display-sec');
const displayMs = document.getElementById('display-ms');
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnReset = document.getElementById('btn-reset');
const body = document.body;

// State
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Functions
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return {
        min: minutes,
        sec: seconds,
        ms: milliseconds
    };
}

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const formatted = formatTime(time);
    
    displayMin.textContent = formatted.min;
    displaySec.textContent = formatted.sec;
    displayMs.textContent = formatted.ms;
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        body.classList.add('running');
    }
}

function stopTimer() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        isRunning = false;
        body.classList.remove('running');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;

    // Reset Display
    displayMin.textContent = "00";
    displaySec.textContent = "00";
    displayMs.textContent = "00";

    body.classList.remove('running');
}

// Helper to set active button
function setActiveButton(btn) {
    [btnStart, btnStop, btnReset].forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

btnStart.addEventListener('click', function() {
    startTimer();
    setActiveButton(btnStart);
});
btnStop.addEventListener('click', function() {
    stopTimer();
    setActiveButton(btnStop);
});
btnReset.addEventListener('click', function() {
    resetTimer();
    setActiveButton(btnReset);
});
