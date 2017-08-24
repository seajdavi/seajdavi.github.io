var game;

var snakeX = 2;
var snakeY = 2;
var height = 20;
var width = 20;
var interval = 125;
var increment = 1;

var tailX = [snakeX];
var tailY = [snakeY];
var fX, fY;
var running = false;
var gameOver = false;
var direction = -1
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
    document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snake');
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
    document.getElementById(fruitX+'-'+fruitY).setAttribute('class', 'fruit');
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
    document.getElementById(fX+'-'+fY).setAttribute('class', 'fruit');
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
    document.getElementById(snakeX+'-'+snakeY).setAttribute('class', 'snake');

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
    }
}


function updateTail() {
    for(var i = length; i > 0; i--) {
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}


function changeSpeed(speed) {
    interval = speed;
    clearInterval(int);
    int = setInterval(gameLoop, interval);

    // stops the dropdown menu from being the active element
    document.activeElement.blur();
}

function restart() {

    // create <button>
    var button = document.createElement("BUTTON");
    button.className = "btn btn-primary btn-lg";
    button.innerHTML = 'Restart';
    button.onclick = function(){refreshPage()};

    document.getElementById('restart').appendChild(button);
}


function refreshPage(){
    window.location.reload();
}


window.addEventListener("keydown", function key(event) {
    // up
    var key = event.keyCode;
    if(direction != -1 && (key == 119 || key == 87 || key == 38)) {
        tempdir = 0;
    }
    // down
    else if(direction != 0 && (key == 115 || key == 83 || key == 40)) {
        tempdir = -1;
    }
    // left
    else if(direction != 2 && (key == 97 || key == 65 || key == 37)) {
        tempdir = 1;
    }
    // right
    else if(direction != 1 && (key == 100 || key == 68 || key == 39)) {
        tempdir = 2;
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
