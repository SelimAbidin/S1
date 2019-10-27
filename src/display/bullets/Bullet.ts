import { Sprite, Texture, Point } from "pixi.js";
import { IBullet } from "./IBullet";
import { IEngineView } from "../IDisplayView";


class Bullet implements IBullet {

    public hitEnemy: boolean = true;

    protected speed: number = 20;
    protected velocity: Point = new Point(0, -1);
    constructor(protected view: IEngineView) {

    }

    setVelocity(x: number, y: number): void {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    set x(x: number) {
        this.view.x = x;
    }

    set y(y: number) {
        this.view.y = y;
    }

    set width(width: number) {
        this.view.width = width;
    }

    set height(height: number) {
        this.view.height = height;
    }

    get x(): number {
        return this.view.x;
    }

    get y(): number {
        return this.view.y;
    }

    get width(): number {
        return this.view.width;
    }

    get height(): number {
        return this.view.height;
    }

    getChildView() {
        return this.view;
    }

    setPosition(x: number, y: number) {
        this.view.x = x;
        this.view.y = y;
    }

    update(deltaTime: number) {
        this.view.y += (this.speed * deltaTime) * this.velocity.y;
        this.view.x += (this.speed * deltaTime) * this.velocity.x;
    }
}

export { Bullet }