const startPauseBtn = document.querySelector(".btn #startPause");
const restartBtn = document.querySelector(".btn #restart");
const timer = document.querySelector('.timer #timerTime');
const box = document.querySelector('.playground');
const box_ = document.querySelector('.playground .timer');
const viewCount = document.querySelector('.spend #spendTime');

let startTime = 0;
let spendTime = 0;
let savedTime = 0;
let timeInterval;
let appearInterval;
let arr = new Array();
let interTime = 1000;
let countNumber = 0;
const boxRect = box.getBoundingClientRect();

function deleteBtn(event) {
    const btn = event.target.parentElement;
    countNumber -= 1;
    btn.remove();
}
function printEndSentence(min) {
    if (min == 1 && countNumber===0) {
        alert('클리어!');
        setTimeout(location.reload(), 3000);
    }
}
startPauseBtn.addEventListener('click', (event) => {
    if (!startPauseBtn.classList.contains('check')) {
        startTime = new Date();
        startPauseBtn.classList.toggle('check');
        event.target.innerHTML = 'Pause';
        timeInterval = setInterval(() => {
            date = new Date();
            diff = date - startTime + savedTime;
            ms = String(parseInt((diff % 1000) / 10)).padStart(2, '0');
            sec = String(parseInt(diff / 1000) % 60).padStart(2, '0');
            min = String(parseInt(diff / 60000)).padStart(2, '0');
            timer.innerHTML = `${min}:${sec}:${ms}`;
            viewCount.innerHTML = `남은개수: ${countNumber}`;
            printEndSentence(min);
        }, 10)
        appearInterval = setInterval(() => {
            interTime = parseInt((Math.random() * 5000));
            randomX = parseInt((Math.random() * (boxRect.right - 100)) + 50);
            randomY = parseInt((Math.random() * (boxRect.height - 100) + boxRect.top) + 50);
            const elementBox = document.createElement('span');
            const createdBtn = document.createElement('button');
            elementBox.appendChild(createdBtn);
            createdBtn.style.fontSize = '36px';
            createdBtn.style.position = 'fixed';
            createdBtn.style.left = `${randomX}px`;
            createdBtn.style.top = `${randomY}px`;
            createdBtn.style.border = 'none'
            createdBtn.style.borderRadius = '50%';
            createdBtn.style.backgroundColor = 'orange';
            createdBtn.style.width = '100px';
            createdBtn.style.height = '100px';
            countNumber += 1
            arr.push(createdBtn);
            createdBtn.addEventListener('click', deleteBtn);
            box_.appendChild(elementBox);
        }, interTime);
    }
    else {
        startPauseBtn.classList.toggle('check');
        event.target.innerHTML = 'Start';
        savedTime = diff;
        clearInterval(timeInterval);
        clearInterval(appearInterval);
    }

});
restartBtn.addEventListener('click', () => {
    clearInterval(appearInterval);
    clearInterval(timeInterval);
    timer.innerHTML = '00:00:00';
    countNumber = 0;
    viewCount.innerHTML = `남은개수: ${countNumber}`;
    savedTime = 0;
    if (startPauseBtn.classList.contains('check')) {
        startPauseBtn.classList.toggle('check');
        startPauseBtn.innerHTML = 'Start';
    };
    for (ele of arr) {
        ele.parentNode.remove();
    };
})

