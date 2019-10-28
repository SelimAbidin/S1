import { Point } from "pixi.js";
import { IBullet } from "./IBullet";
import { Object2D } from "../Object2D";
import { BulletType } from "../../factories/BulletFactory";


class Bullet extends Object2D implements IBullet {

    public hitEnemy: boolean = true;
    public type: BulletType;
    protected speed: number = 20;
    protected velocity: Point = new Point(0, -1);

    setVelocity(x: number, y: number): void {
        this.velocity.x = x;
        this.velocity.y = y;
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