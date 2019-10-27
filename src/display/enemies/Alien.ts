import { Texture, Sprite } from "pixi.js";
import { IEnemy } from "./IEnemy";
import { IDisplayView } from "../IDisplayView";


class Alien implements IEnemy, IDisplayView {

    private view: any;
    constructor() {
        const texture = Texture.from("alien");
        this.view = new Sprite(texture);
        this.view.anchor.set(0.5);
        this.view.zIndex = 10;
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

    update(deltaTime: number): void {
        this.view.y += 1 * deltaTime;
    }
}

export { Alien }