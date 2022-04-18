import { CanvasDrawableItem, CanvasDrawableItemTypes, CanvasItem, ICircle, Direction } from "./types";

export class Circle implements ICircle, CanvasDrawableItem {
    
    radius: number;
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
    radiusX: number;
    radiusY: number;
    currentDirection : Direction;
    drawRectHitbox : boolean;

    constructor(startpositon : CanvasItem) {
        this.x = startpositon.x;
        this.y = startpositon.y;
        this.xEnd = startpositon.xEnd;
        this.yEnd = startpositon.yEnd;
        this.radius = (this.xEnd - this.x) / 2;
        this.currentDirection = Direction.Unset;
    }
    
    collideable(): boolean {
        return true;
    }

    getType(): CanvasDrawableItemTypes {
        return CanvasDrawableItemTypes.Circle;
    }
    
    getDirection(): Direction {
        return this.currentDirection;
    }

    setDirection(direciton: Direction): void {
        this.currentDirection = direciton;
    }
    
    update(time: number): void {
        if (this.currentDirection != Direction.Unset) {
            if (this.currentDirection === Direction.Down) {
                this.y += time;
                this.yEnd += time;
            }
            if (this.currentDirection === Direction.Up) {
                this.y -= time;
                this.yEnd -= time;
            }
            if (this.currentDirection === Direction.Left) {
                this.x -= time;
                this.xEnd -= time;
            }
            if (this.currentDirection === Direction.Right) {
                this.x += time;
                this.xEnd += time;
            }
        }
    }

    /*      xy       xend
            ---------
            |       |
            |   p   |
            |       |
            ---------
            yend
    */
    
    draw (context : CanvasRenderingContext2D): void {
        const distanceX = this.xEnd - this.x;
        const distanceY = this.yEnd - this.y;
        this.radiusX = this.x + distanceX / 2;
        this.radiusY = this.y + distanceY / 2;
        context.beginPath();
        context.arc(this.radiusX, this.radiusY, this.radius, 0,2 * Math.PI,false);
        context.stroke();
        if (this.drawRectHitbox) {
            context.rect(this.x, this.y, this.xEnd - this.x, this.yEnd - this.y);
            context.stroke();
        }
    }
}