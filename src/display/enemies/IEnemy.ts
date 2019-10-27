import { IDisplayView } from "../IDisplayView"





interface IBaseEnemy {
    update(deltaTime: number): void;
    speed: number;
}

type IEnemy = IDisplayView & IBaseEnemy;


export { IEnemy }