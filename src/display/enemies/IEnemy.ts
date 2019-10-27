import { IDisplayView } from "../IDisplayView"
import { BulletType } from "../../factories/BulletFactory";
import { EnemyTypes } from "../../factories/EnemyFactory";





interface IBaseEnemy {
    update(deltaTime: number): void;
    speed: number;
    type: EnemyTypes
}

interface IArmedEnemy {
    needsFire: boolean;
    bulletType: BulletType;
    resetFire(): void;
}

type IEnemy = IDisplayView & IBaseEnemy;


export { IEnemy, IArmedEnemy }