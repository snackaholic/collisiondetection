import { doCanvasItemsCollide } from "./collision";
import { CanvasDomConfig, CanvasDrawableItem, CollisionIndexesObject, Direction} from "./types";

export class Canvas {
    domConfig: CanvasDomConfig;
    placedDomCanvas: boolean;
    items: CanvasDrawableItem[];
    self: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(config: CanvasDomConfig, items: CanvasDrawableItem[]) {
        this.domConfig = config;
        this.items = items;
        this.placeCanvas();
        this.drawItems();
    }

    flipDirection(item: CanvasDrawableItem) {
        if (item.getDirection() === Direction.Up) {
            item.setDirection(Direction.Down);
            return;
        }
        if (item.getDirection() === Direction.Down) {
            item.setDirection(Direction.Up);
            return;
        }
        if (item.getDirection() === Direction.Left) {
            item.setDirection(Direction.Right);
            return;
        }
        if (item.getDirection() === Direction.Right) {
            item.setDirection(Direction.Left);
            return;
        }
    }

    handleCollision(itema: CanvasDrawableItem, itemb: CanvasDrawableItem) {
        this.flipDirection(itema);
        this.flipDirection(itemb);        
    }
    

    calculateCollisions() {
        let knownCollisions: CollisionIndexesObject[] = [];
        // check if items collide with each other
        for (let i = 0; i < this.items.length; i++) {
            let itema = this.items[i];
            if(!itema.collideable()) {
                continue;
            }
            for (let j = 0; j < this.items.length; j++) {
                let skip = false;
                // we dont compare if already calculated this collision
                for (let k = 0; k < knownCollisions.length; k++) {
                    let collisionObject = knownCollisions[k];
                    if ((collisionObject.index1 == i && collisionObject.index2 == j) ||
                        (collisionObject.index1 == j && collisionObject.index2 == i)) {
                        // already computed -> skip
                        skip = true;
                    }
                }
                // we dont compare with ourselves...
                if (j != i && !skip) {
                    let itemb = this.items[j];
                    if(!itemb.collideable()) {
                        continue;
                    }
                    // check if one edge is within other item
                    if (doCanvasItemsCollide(itema, itemb)) {
                        knownCollisions.push({ index1: i, index2: j });
                        this.handleCollision(itema, itemb);
                    }
                }
            }
        }
    }


    update(time: number) {
        // calculate each items new position
        this.items.forEach(item => item.update(time));
    }

    calculateEdgeCollision() {
        // correct if circle is out of edge from canvas
        this.items.forEach(item => {
            if (item.x < 0) {
                let distanceX = item.xEnd - item.x;
                item.x = 0;
                item.xEnd = 0 + distanceX;
                item.setDirection(Direction.Right);
            }
            if (item.y < 0) {
                let distanceY = item.yEnd - item.y;
                item.y = 0;
                item.yEnd = 0 + distanceY;
                item.setDirection(Direction.Down);
            }
            if (item.xEnd > this.domConfig.width) {
                let distanceX = item.xEnd - item.x;
                item.x = this.domConfig.width - distanceX;
                item.xEnd = this.domConfig.width;
                item.setDirection(Direction.Left);
            }
            if (item.yEnd > this.domConfig.height) {
                let distanceY = item.yEnd - item.y;
                item.y = this.domConfig.height - distanceY;
                item.yEnd = this.domConfig.height;
                item.setDirection(Direction.Up);
            }
        });
    }

    placeCanvas() {
        let ref = document.createElement("canvas");
        ref.width = this.domConfig.width;
        ref.height = this.domConfig.height;
        ref.id = "canvas";
        document.body.prepend(ref);
        this.self = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.self.getContext("2d");
    }

    clear() {
        // Store the current transformation matrix
        this.context.save();
        // Use the identity matrix while clearing the canvas
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.domConfig.width, this.domConfig.height);
        // Restore the transform context
        this.context.restore();
    }

    drawItems(): boolean {
        this.items.forEach(item => item.draw(this.context));
        return true;
    }
}
