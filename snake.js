var game;
var snapeMode = false;

var snakeX = 2;
var snakeY = 2;
var height = 16;
var width = 30;
var interval = 125;
var increment = 1;

var tailX = [snakeX];
var tailY = [snakeY];
var fX, fY;
var length = 0;
var running = false;
var gameOver = false;
var direction = -1
var tempdir = 2;
var int;

function run() {
    init();
    int = setInterval(gameLoop, interval);
}


function init() {
    createMap();
    createSnake();
    createFruit();
}


function createMap() {
    var table = document.createElement('TABLE');
    table.className = 'game-table';

    for (var y=0; y<height; y++) {
        var row = table.insertRow(y);
        for (var x=0; x<width; x++) {
            if (x==0 || x==width-1 || y==0 || y==height-1) {
                var cell = row.insertCell(x);
                cell.className = 'wall';
                cell.id = (x+'-'+y)
            }
            else {
                var cell = row.insertCell(x);
                cell.className = 'blank';
                cell.id = (x+'-'+y)
            }
      }
    }
    game.appendChild(table);
}


function createSnake() {
    if (snapeMode) {
        document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snape');
    }
    else {
        document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snake');

    }
}


function createFruit () {
    // find empty space to put fruit
    var found = false;
    while (!found && (length < (width-2)*(height-2)+1)) {
        var fruitX = random(1, width-1);
        var fruitY = random(1, height-1);
        if (document.getElementById(fruitX+'-'+fruitY).getAttribute('class') == 'blank') {
            found = true;
        }
    }
    if (snapeMode) {
        document.getElementById(fruitX+'-'+fruitY).setAttribute('class', 'harry');
    }
    else {
        document.getElementById(fruitX+'-'+fruitY).setAttribute('class', 'fruit');
    }
    fX = fruitX;
    fY = fruitY;
}


function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


function gameLoop() {
    if(running && !gameOver) {
        update();
    }
    else if(gameOver) {
        clearInterval(int);
        restart();
    }
}


function update() {
    direction = tempdir;
    if (snapeMode) {
        document.getElementById(fX+'-'+fY).setAttribute('class', 'harry');
    }
    else {
        document.getElementById(fX+'-'+fY).setAttribute('class', 'fruit');
    }
    updateTail();

    //sets the last segment of the tail to blank  before moving the snake
    document.getElementById(tailX[length]+'-'+tailY[length]).setAttribute('class', 'blank');

    //updates the position of the snake according to the direction
    if(direction == 0)
        snakeY--;
    else if(direction == -1)
        snakeY++;
    else if(direction == 1)
        snakeX--;
    else if(direction == 2)
        snakeX++;
    //draws the head of the snake on the tail
    if (snapeMode) {
        document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snape');
    }
    else {
        document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snake');
    }
    // snake hits itself
    for(var i = tailX.length-1; i >=0; i--) {
        if(snakeX == tailX[i] && snakeY == tailY[i]) {
            gameOver = true;
            break;
        }
    }

    // snake hits wall
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) {
        gameOver = true;
    }

    // snake hits fruit
    else if(snakeX == fX && snakeY == fY) {
        createFruit();
        length+=increment;

        if (snapeMode == true) {
            if (random(1,1) == 1) {
                var audio = new Audio('snapeAssets/snapeAudio/snape' + random(1,9) + '.m4a');
                audio.play();
            }
        }
    }
}


function updateTail() {
    for(var i = length; i > 0; i--) {
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;

    if (snapeMode) {
        document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snape-tail');
    }
    else {
        document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snake');
    }
}


function changeSpeed(speed) {
    interval = speed;
    clearInterval(int);
    int = setInterval(gameLoop, interval);

    // stops the dropdown menu from being the active element
    document.activeElement.blur();
}

function restart() {
    var button = document.createElement("BUTTON");
    button.className = "btn btn-primary btn-lg";
    button.innerHTML = 'Restart';
    button.onclick = function(){refreshPage()};

    document.getElementById('restart').appendChild(button);
}


function refreshPage(){
    clearInterval(int);
    snakeX = 2;
    snakeY = 2;
    tailX = [snakeX];
    tailY = [snakeY];
    length = 0;
    document.getElementById('game').innerHTML = '';
    document.getElementById('restart').innerHTML = '';
    running = false;
    gameOver = false;
    tempdir = 2;
    run();
}


function snape() {
    if (snapeMode) {
        return false;
    }

    snapeMode = true;

    // well at the top of the page
    var well = document.getElementById('mainWell');
    well.style.backgroundColor = "#000000";
    well.style.color = "#aaaaaa";
    well.style.fontFamily = 'hp';

    // page background image
    document.body.style.backgroundImage = 'url(snapeAssets/snapePics/snape_bg3.jpg)';
    document.body.style.backgroundSize = "100% auto";

    // changes title from SNAKE to SNAKE
    document.getElementById('title').innerHTML = 'SNAPE';

    // hogwarts background inside game border
    var gameArea = document.getElementById('game');
    gameArea.style.backgroundImage = 'url(snapeAssets/snapePics/hp_background.jpg)';
    gameArea.style.backgroundSize = "100% auto";

    // harry potter theme music
    var audio = new Audio('snapeAssets/hp_music.mp3');
    audio.play();

    // changes the snake and fruit
    document.getElementById(fX+'-'+fY).setAttribute('class', 'harry');
    document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snape');

    // removes SNAPE MODE button
    document.getElementById('snape').remove();
}


window.addEventListener("keydown", function key(event) {
    // up
    var key = event.keyCode;
    if(direction != -1 && (key == 119 || key == 87 || key == 38)) {
        tempdir = 0;
        running = true;
    }
    // down
    else if(direction != 0 && (key == 115 || key == 83 || key == 40)) {
        tempdir = -1;
        running = true;
    }
    // left
    else if(direction != 2 && (key == 97 || key == 65 || key == 37)) {
        tempdir = 1;
        running = true;
    }
    // right
    else if(direction != 1 && (key == 100 || key == 68 || key == 39)) {
        tempdir = 2;
        running = true;
    }
    // space
    else if(key == 32) {
        running = !running ;
    }
    // stops window from scrolling if using the arrow keys
    event.preventDefault();
});


window.onload = function() {
  game = document.getElementById('game');
  run();
};
