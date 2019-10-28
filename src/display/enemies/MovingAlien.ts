import { Alien } from "./Alien";
import { IEngineView } from "../IDisplayView";



class MovingAlien extends Alien {

    protected xMove: number = 0;
    constructor(view: IEngineView) {
        super(view);
        this.xMove = Math.random() * Math.random();
    }

    update(deltaTime: number) {
        this.xMove += 0.01 * this.speed;
        this.view.x += Math.sin(this.xMove);
        super.update(deltaTime);
    }
}

export { MovingAlien }