import { IDisplayView } from "../IDisplayView";
import { BulletType } from "../../factories/BulletFactory";


interface IBulletBase {
    update(deltaTime: number): void;
    setVelocity(x: number, y: number): void;
    hitEnemy: boolean;
    type: BulletType;
}


type IBullet = IDisplayView & IBulletBase;

export { IBullet }