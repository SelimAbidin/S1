import { Texture, AnimatedSprite } from "pixi.js";
import { IDisplayView, IAnimatable } from "./IDisplayView";
import { BulletType } from "../factories/BulletFactory";

class HeroPlane {

    private nextX: number = 0;
    private nextY: number = 0;
    public allowFire: boolean = false;
    private bullet: BulletType = BulletType.LASER;
    constructor(private view: any) {

    }

    set x(x: number) {
        this.view.x = x;
    }

    set y(y: number) {
        this.view.y = y;
    }

    get y(): number {
        return this.view.y;
    }

    get x(): number {
        return this.view.x;
    }

    get height(): number {
        return this.view.height;
    }

    set height(height: number) {
        this.view.height = height;
    }

    get width(): number {
        return this.view.width;
    }

    set width(width: number) {
        this.view.width = width;
    }

    // get height(): number {
    //     return this.view.height;
    // }

    get bulletType(): BulletType {
        return this.bullet;
    }

    setPosition(x: number, y: number) {
        this.nextX = x;
        this.nextY = y;
    }

    getChildView(): any {
        return this.view
    }

    resetFire() {
        this.needsFire = false;
        this.fireCounter = 0;
    }

    fireCounter: number = 0;
    needsFire: boolean = true;
    update(deltaTime: number): void {

        this.fireCounter += deltaTime;
        if (this.fireCounter > 5) {
            this.needsFire = true;
        }

        let speedX = ((this.view.x - this.nextX) / 10);
        this.view.gotoAndStop(Math.min(Math.abs(speedX), 6) * -Math.sign(speedX))
        this.view.x -= speedX * deltaTime;
        this.view.y -= ((this.view.y - this.nextY) / 10) * deltaTime;
    }
}

export { HeroPlane }