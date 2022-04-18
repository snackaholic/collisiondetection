import { Circle } from "./circle";
import { CanvasDrawableItem, CanvasDrawableItemTypes, CanvasItem, Coordinates, Direction, ICircle, IRectangle } from "./types";

function doRectanglesCollide(rectangle1: IRectangle, rectangle2: IRectangle): boolean {
    // starting x point of rectangle 1 greater than endpoint x of rectangle 2
    if (rectangle1.x > rectangle2.x + rectangle2.width ||
        // end x point of r rectangle 1 smaller than startpoint x of rectangle 2
        rectangle1.x + rectangle1.width < rectangle2.x ||
        // starting y point of rectangle 1 greater than endpoint y of rectangle 2
        rectangle1.y > rectangle2.y + rectangle2.height ||
        // end y point of rectangle 1 smaller  than start y point of rectangle 2
        rectangle1.y + rectangle1.height < rectangle2.y
    ) {
        return false;
    } 
    return true;
}

function doCirclesCollide(cirlce1 : ICircle, circle2 : ICircle) {
    let distanceX = circle2.x - cirlce1.x;
    let distanceY = circle2.y - cirlce1.y;
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    let sumRadius= cirlce1.radius + circle2.radius;
    if (distance < sumRadius) {
        return true;
    }
    return false;
}


export function doCanvasItemsCollide(item1: CanvasDrawableItem, item2: CanvasDrawableItem) {
    let type1 : CanvasDrawableItemTypes = item1.getType();
    let type2 : CanvasDrawableItemTypes = item2.getType();
    if(type1 === CanvasDrawableItemTypes.Mouse) {
        type1 = CanvasDrawableItemTypes.Rectangle;
    }
    if (type2 === CanvasDrawableItemTypes.Mouse) {
        type2 = CanvasDrawableItemTypes.Rectangle;
    }
    if (type1 === CanvasDrawableItemTypes.Circle && type2 === CanvasDrawableItemTypes.Circle) {
        return doCirclesCollide(getCircleFromDrawableItem(item1), getCircleFromDrawableItem(item2));
    } else {
        // fallback calculation based on rectangle
        return doRectanglesCollide(getRectangleFromDrawableItem(item1), getRectangleFromDrawableItem(item2));
    }
}

function getCircleFromDrawableItem(item: CanvasDrawableItem): ICircle {
    const itemascircle : Circle = <Circle> item;
    return {x: itemascircle.x, y : itemascircle.y, radius : itemascircle.radius, radiusX : itemascircle.radiusX, radiusY : itemascircle.radiusY};
}

function getRectangleFromDrawableItem(item: CanvasDrawableItem) : IRectangle {
    return {
        width: item.xEnd - item.x,
        height: item.yEnd - item.y,
        x: item.x,
        y: item.y
    };
}

function isPointWithinItem(point: Coordinates, item: CanvasDrawableItem): boolean {
    let x = point.x;
    let y = point.y;
    if (x > item.x && x < item.xEnd && y > item.y && y < item.yEnd) {
        return true;
    }
    return false;
}

// since collision means they already in each other -> we undo this in this function. "push" them away from each other
function setOuterForItems(itema: CanvasDrawableItem, itemb: CanvasDrawableItem) {
    let itemaTopLeft: Coordinates = { x: itema.x, y: itema.y };
    let itemaTopRight: Coordinates = { x: itema.xEnd, y: itema.y };
    let itemaBottomLeft: Coordinates = { x: itema.xEnd, y: itema.y };
    let itemaBottomRight: Coordinates = { x: itema.xEnd, y: itema.yEnd };
    if (this.isPointWithinItem(itemaTopLeft, itemb)) {
        if (itema.getDirection() === Direction.Down) {
            itema.x = itemb.xEnd;
            itema.xEnd = itema.x + 50;
            itema.y = itemb.yEnd;
            itema.yEnd = itema.y + 50;
        }
    }
    if (this.isPointWithinItem(itemaTopRight, itemb)) {
        if (itema.getDirection() === Direction.Left) {
            itema.xEnd = itemb.x;
            itema.x = itema.xEnd - 50;
            itema.yEnd = itema.y;
            itema.y = itema.yEnd - 50;
        }
    }
    if (this.isPointWithinItem(itemaBottomLeft, itemb)) {
        if (itema.getDirection() === Direction.Up) {
            itema.xEnd = itema.x;
            itema.x = itema.xEnd - 50;
            itema.yEnd = itema.y;
            itema.y = itema.yEnd - 50;
        }
    }
    if (this.isPointWithinItem(itemaBottomRight, itemb)) {
        if (itema.getDirection() === Direction.Left) {
            itema.xEnd = itemb.x;
            itema.x = itema.xEnd - 50;
            itema.yEnd = itemb.y;
            itema.y = itema.yEnd - 50;
        }
    }
}


