import { MovingAlien } from "./MovingAlien";
import { IArmedEnemy } from "./IEnemy";
import { BulletType } from "../../factories/BulletFactory";



class ArmedAlien extends MovingAlien implements IArmedEnemy {

    private fireCount: number = 0;
    private fireTime: number = 300;
    public needsFire: boolean = false;
    public bulletType: BulletType;
    constructor() {
        super();
        this.bulletType = BulletType.ALIEN_BULLET;
        this.fireCount = Math.random() * this.fireTime;
    }

    resetFire(): void {
        this.needsFire = false;
        this.fireCount = 0;
    }


    update(deltaTime: number) {
        super.update(deltaTime);
        this.fireCount += deltaTime;
        if (this.fireCount > this.fireTime) {
            this.needsFire = true;
        }
    }
}

export { ArmedAlien }