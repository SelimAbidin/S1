import { Texture, Sprite } from "pixi.js";
import { IEnemy } from "./IEnemy";
import { IDisplayView, IEngineView } from "../IDisplayView";
import { Object2D } from "../Object2D";
import { EnemyTypes } from "../../factories/EnemyFactory";


class Alien extends Object2D implements IEnemy {

    protected view: any;
    speed: number = 3;
    type: EnemyTypes;
    constructor(view: IEngineView) {
        super(view);
        this.speed += Math.random();
    }

    getChildView() {
        return this.view;
    }

    setPosition(x: number, y: number) {
        this.view.x = x;
        this.view.y = y;
    }

    update(deltaTime: number): void {
        this.view.y += this.speed * deltaTime;
    }
}

export { Alien }