import { IDisplayView } from "../IDisplayView";


interface IBulletBase {
    update(deltaTime: number): void;
    setVelocity(x: number, y: number): void;
    hitEnemy: boolean;
}


type IBullet = IDisplayView & IBulletBase;

export { IBullet }