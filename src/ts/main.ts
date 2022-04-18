import { Canvas } from "./canvas";
import { Circle } from "./circle";
import { Mouse } from "./mouse";
import { CanvasDomConfig, CanvasDrawableItem, Direction } from "./types";

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function randomDirection() {
    let num = randomNumber(4);
    if (num === 0) {
        return Direction.Up;
    }
    if (num === 1) {
        return Direction.Down;
    }
    if (num === 2) {
        return Direction.Left;
    }
    if (num === 3) {
        return Direction.Right;
    }
}


// actual drawn window specs
const documentYMax = window.innerHeight;
const documentXMax = window.innerWidth;
const spawnRandom = true;
const spawnCollisionTest = false;

// canvas items
let items: CanvasDrawableItem[] = [];
let maxXItems = Math.floor(documentXMax / 50);
let maxYItems = Math.floor(documentYMax / 50);
if(spawnRandom) {
    for(let i = 0; i < maxXItems; i++) {
        for(let j = 0; j < maxYItems; j++) {
            let randomNum = randomNumber(10);
            if (randomNum === 5) {
                const circle: Circle = new Circle({ x: i * 50, y: j * 50, xEnd: i * 50 + 50, yEnd: j * 50 + 50 });
                circle.setDirection(randomDirection());
                items.push(circle);
            }
        }   
    }
}
if(spawnCollisionTest) {
    const circle: Circle = new Circle({ x: 50, y:  0, xEnd: 100, yEnd: 50 });
    circle.setDirection(Direction.Down);
    items.push(circle);

    const circle2: Circle = new Circle({ x: 50, y:  550, xEnd: 100, yEnd: 600 });
    circle2.setDirection(Direction.Up);
    items.push(circle2);

    const circle5: Circle = new Circle({ x: 50, y:  750, xEnd: 100, yEnd: 800 });
    circle5.setDirection(Direction.Up);
    items.push(circle5);

    const circle3: Circle = new Circle({ x: 500, y:  0, xEnd: 550, yEnd: 50 });
    circle3.setDirection(Direction.Left);
    items.push(circle3);

    const circle4: Circle = new Circle({ x: 300, y:  0, xEnd: 350, yEnd: 50 });
    circle4.setDirection(Direction.Right);
    items.push(circle4);
}

items.push(new Mouse());

// canvas settings
// fullscreen / monitor specs
const windowXMax = window.outerWidth;
const windowYMax = window.outerHeight;

const config: CanvasDomConfig = { width: documentXMax, height: documentYMax };
const canvas: Canvas = new Canvas(config, items);

function loop(timestamp: number) {
    var progress = (timestamp - lastRender);
    canvas.clear();
    canvas.update(2);
    canvas.calculateCollisions();
    canvas.calculateEdgeCollision();
    canvas.drawItems();
    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);