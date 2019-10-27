import { IEngineView, IAnimatable } from "./IDisplayView";
import { BulletType } from "../factories/BulletFactory";
import { Object2D } from "./Object2D";

class HeroPlane extends Object2D {

    private nextX: number = 0;
    private nextY: number = 0;
    public allowFire: boolean = false;
    private bullet: BulletType = BulletType.LASER;
    constructor(view: IEngineView & IAnimatable) {
        super(view as IEngineView);
    }


    get bulletType(): BulletType {
        return this.bullet;
    }

    setPosition(x: number, y: number) {
        this.nextX = x;
        this.nextY = y;
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
        let view = this.view as IAnimatable & IEngineView;
        view.gotoAndStop(Math.min(Math.abs(speedX), 6) * -Math.sign(speedX))
        view.x -= speedX * deltaTime;
        view.y -= ((view.y - this.nextY) / 10) * deltaTime;
    }
}

export { HeroPlane }