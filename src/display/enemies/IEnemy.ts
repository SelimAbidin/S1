import { IDisplayView } from "../IDisplayView"





interface IBaseEnemy {
    update(deltaTime: number): void;
}

type IEnemy = IDisplayView & IBaseEnemy;


export { IEnemy }