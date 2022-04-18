export interface Coordinates {
    x : number,
    y : number
}

export interface CanvasItem extends Coordinates {
    xEnd: number,
    yEnd: number
}

export interface IRectangle extends Coordinates{
    width : number,
    height : number
}

export interface ICircle extends Coordinates{
    radius : number
    radiusX : number,
    radiusY : number 
}

export enum Direction {
    Up,
    Down,
    Left,
    Right,
    Unset,
}

export enum CanvasDrawableItemTypes{
    Circle, Rectangle, Mouse
}

export interface CollisionIndexesObject {
    index1: number;
    index2: number;
}

export interface CanvasDomConfig {
    width: number,
    height: number
}

export interface CanvasDrawableItem extends CanvasItem {
    draw(context: CanvasRenderingContext2D): void
    update(time: number): void
    setDirection(direciton: Direction): void
    getDirection(): Direction
    getType() : CanvasDrawableItemTypes,
    collideable () : boolean
}