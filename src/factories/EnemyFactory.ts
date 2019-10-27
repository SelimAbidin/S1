import { Alien } from "../display/enemies/Alien";
import { IEnemy } from "../display/enemies/IEnemy";
import { MovingAliens } from "../display/enemies/MovingAliens";


enum EnemyTypes {
    ALIEN = 'ALIEN',
    MOVING_ALIEN = 'MOVING_ALIEN',
}


class EnemyFactory {

    constructor() {

    }

    public createEnemyByType(type: EnemyTypes): IEnemy | null {

        if (type === EnemyTypes.ALIEN) {
            let enemy = new Alien();
            return enemy;
        } else if (type === EnemyTypes.MOVING_ALIEN) {
            let enemy = new MovingAliens();
            return enemy;
        }
        return null;
    }

}

export { EnemyFactory, EnemyTypes }