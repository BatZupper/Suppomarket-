const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
let currentFrame = 0;
let totalFrames = 275; // Imposta il numero totale di frame disponibili
let fps = 24; // Frame rate (frame per secondo)
let isPlaying = false;
let animationInterval;

var anID;
var audio;

function loadFrame(frameNum) {
    const img = new Image();
    img.src = `frames/${frameNum}.png`; // Prende i frame dalla cartella "frames"
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Disegna il frame
    };
}

function startAnimation() {
    if (isPlaying) return;
    isPlaying = true;

    audio = new Audio("sounds/-1.mp3");
    audio.play();

    animationInterval = setInterval(() => {
        loadFrame(currentFrame);
        currentFrame++;
        if (currentFrame > totalFrames) {
            currentFrame = currentFrame - 1; // pausati
            audio.pause();
        }
    }, 1000 / fps);
}

function pauseAnimation() {
    isPlaying = false;
    audio.pause();
    clearInterval(animationInterval);
}

function resumeAnimation() {
    if (!isPlaying) startAnimation();
    audio.resume();
}

function setFrame(frameNum) {
    if (frameNum >= 1 && frameNum <= totalFrames) {
        currentFrame = frameNum;
        loadFrame(currentFrame);
    }
}

document.getElementById('startBtn').addEventListener('click', startAnimation);
document.getElementById('pauseBtn').addEventListener('click', pauseAnimation);
document.getElementById('resumeBtn').addEventListener('click', resumeAnimation);

document.getElementById('setFrameBtn').addEventListener('click', () => {
    const frameNum = parseInt(document.getElementById('frameInput').value);
    setFrame(frameNum);
});
