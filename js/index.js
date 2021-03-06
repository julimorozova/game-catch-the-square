let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time');

let colors = ['red', 'blue', 'green', 'yellow', 'pink', '#fdbb2d', '#22c1c3', '#2dfd35', '#902dfd',
 '#fd2dcd', '#ff98a4', '#b198ff', '#ffde98', '#bdff98', '#1b7909', '#790977'];

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', true);

    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    hide($start);

    let interval = setInterval(() => {
        let time = parseFloat($time.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function show($el) {
    $el.classList.remove('hide');
}

function  hide($el) {
    $el.classList.add('hide');
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime(){
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader);


}

function renderBox() {
    $game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    let randomColor = getRandom(0, colors.length);

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = colors[randomColor];
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', true);

    $game.insertAdjacentElement('afterbegin', box);
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return;
    }
    if (event.target.dataset) {
        score++;
        renderBox();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max -min) + min);
}