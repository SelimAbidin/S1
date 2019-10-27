import { IDisplayView } from "../IDisplayView"
import { BulletType } from "../../factories/BulletFactory";





interface IBaseEnemy {
    update(deltaTime: number): void;
    speed: number;
}

interface IArmedEnemy {
    needsFire: boolean;
    bulletType: BulletType;
    resetFire(): void;
}

type IEnemy = IDisplayView & IBaseEnemy;


export { IEnemy, IArmedEnemy }