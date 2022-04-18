import { CanvasDrawableItem, CanvasDrawableItemTypes, Direction } from "./types";

export class Mouse implements CanvasDrawableItem{
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
    size : number;
    drawRectHitbox : boolean;
    drawCircle: boolean;
    
    constructor() {
        document.addEventListener('mousemove', this.tellPos.bind(this), false);
        this.size = 50;
        this.drawRectHitbox = true;
    }

    collideable(): boolean {
        return this.x != undefined && this.y != undefined;
    }

    getType(): CanvasDrawableItemTypes {
        return CanvasDrawableItemTypes.Mouse;
    }

    tellPos(p){
        var info = document.getElementById('info');
        info.innerHTML = 'Position X : ' + p.pageX + '<br />Position Y : ' + p.pageY;
        this.x = p.pageX - (this.size / 2);
        this.xEnd = this.x + this.size;
        this.y = p.pageY - (this.size / 2);
        this.yEnd = this.y + this.size;
    }

    draw(context: CanvasRenderingContext2D): void {
        const distanceX = this.xEnd - this.x;
        const distanceY = this.yEnd - this.y;
        const px = this.x + distanceX / 2;
        const py = this.y + distanceY / 2;
        const radius = distanceX / 2;
        if(this.drawCircle) {
            context.beginPath();
            context.arc(px, py, radius, 0,2 * Math.PI,false);
            context.stroke();
        }
        
        if(this.drawRectHitbox) {
            context.beginPath();
            context.rect(this.x, this.y, this.xEnd - this.x, this.yEnd - this.y);
            context.stroke();
        }
    }

    update(time: number): void {
    }

    setDirection(direciton: Direction): void {
    }

    getDirection(): Direction {
        return Direction.Up;
    }
    
}