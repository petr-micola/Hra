const start = document.getElementById('startGame');
const end = document.getElementById('gameOver');
const btn = document.getElementById('startBtn');

let canvas;
let scl = 20;
let snake;
let food;

class Snake {
    constructor(posX, posY, speedX, speedY) {
        this.body = [];
        this.body[0] = createVector(posX, posY);
        this.sX = speedX;
        this.sY = speedY;
    }

    get head() {
        return this.body[this.body.length - 1];
    }

    move() {
        let head = this.head.copy();
        this.body.shift();
        head.x += this.sX * scl;
        head.y += this.sY * scl;
        this.body.push(head);
    }

    controls() {
        if (keyIsDown(UP_ARROW)) {
            if (this.sY != 1) {
                this.sX = 0;
                this.sY = -1;
            }
        }
        if (keyIsDown(DOWN_ARROW)) {
            if (this.sY != -1) {
                this.sX = 0;
                this.sY = 1;
            }
        }
        if (keyIsDown(LEFT_ARROW)) {
            if (this.sX != 1) {
                this.sX = -1;
                this.sY = 0;
            }
        }
        if (keyIsDown(RIGHT_ARROW)) {
            if (this.sX != -1) {
                this.sX = 1;
                this.sY = 0;
            }
        }
    }

    grow() {
        let head = this.head.copy();
        this.body.push(head);
    }

    eat(x, y) {
        if (this.head.x == x && this.head.y == y) {
            this.grow();
            return true;
        }
        return false;
    }

    end() {
        if (this.head.x > width - 1 || this.head.x < 0 || this.head.y > height - 1 || this.head.y < 0) return true;
        for (let i = 0; i < this.body.length - 1; i++) {
            if (this.body[i].x == this.head.x && this.body[i].y == this.head.y) return true;
        }
        return false;
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            fill('rgba(255, 255, 255, 0.87)');
            rect(this.body[i].x, this.body[i].y, scl, scl, 5);
        }
    }
}

class Food {
    constructor() {
        this.w = floor(width / scl);
        this.h = floor(height / scl);
    }

    location() {
        this.x = floor(random(this.w)) * scl;
        this.y = floor(random(this.h)) * scl;
    }

    draw() {
        fill(160, 68, 247);
        rect(this.x, this.y, scl, scl, 5);
    }
}

function setup() {
    canvas = createCanvas(displayWidth / 1.5, displayHeight / 1.5);
    canvas.parent('myCanvas');
    start.classList.add('visible');
    btn.addEventListener('click', () => {
        start.classList.remove('visible');
    });
    frameRate(10);
    snake = new Snake(0, 0, 1, 0);
    snake.grow();
    food = new Food();
    food.location();
}

function draw() {
    background(33, 33, 36);
    if (snake.eat(food.x, food.y)) food.location();
    snake.controls();
    snake.move();
    snake.draw();
    if (snake.end()) {
        noLoop();
        end.classList.add('visible');
    }
    food.draw();
}