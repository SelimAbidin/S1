import { Alien } from "./Alien";



class MovingAliens extends Alien {

    protected xMove: number = 0;
    constructor() {
        super();
        this.xMove = Math.random() * Math.random();
    }

    update(deltaTime: number) {
        this.xMove += 0.01 * this.speed;
        this.view.x += Math.sin(this.xMove);
        super.update(deltaTime);
    }
}

export { MovingAliens }