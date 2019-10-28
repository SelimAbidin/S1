import { BulletType } from "../factories/BulletFactory";
import { IAnimatable, IEngineView } from "./IDisplayView";
import { Object2D } from "./Object2D";

class HeroPlane extends Object2D {

    get bulletType(): BulletType {
        return this.bullet;
    }
    public allowFire: boolean = false;
    public needsFire: boolean = true;

    protected nextX: number = 0;
    protected nextY: number = 0;
    protected fireCounter: number = 0;
    private bullet: BulletType = BulletType.LASER;
    constructor(view: IEngineView & IAnimatable) {
        super(view as IEngineView);
    }

    public setPosition(x: number, y: number) {
        this.nextX = x;
        this.nextY = y;
    }

    public resetFire() {
        this.needsFire = false;
        this.fireCounter = 0;
    }

    public update(deltaTime: number): void {

        this.fireCounter += deltaTime;
        if (this.fireCounter > 10) {
            this.needsFire = true;
        }

        const speedX = ((this.view.x - this.nextX) / 10);
        const view = this.view as IAnimatable & IEngineView;
        view.gotoAndStop(Math.min(Math.abs(speedX), 6) * -Math.sign(speedX));
        view.x -= speedX * deltaTime;
        view.y -= ((view.y - this.nextY) / 10) * deltaTime;
    }
}

export { HeroPlane };
