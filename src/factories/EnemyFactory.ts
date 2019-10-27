import { Alien } from "../display/enemies/Alien";
import { IEnemy } from "../display/enemies/IEnemy";
import { MovingAlien } from "../display/enemies/MovingAlien";
import { ArmedAlien } from "../display/enemies/ArmedAlien";


enum EnemyTypes {
    ALIEN = 'alien',
    MOVING_ALIEN = 'movingAlien',
    ARMED_ALIEN = 'ArmedAlien',
}


class EnemyFactory {

    public createEnemyByType(type: EnemyTypes): IEnemy | null {

        if (type === EnemyTypes.ALIEN) {
            let enemy = new Alien();
            return enemy;
        } else if (type === EnemyTypes.MOVING_ALIEN) {
            let enemy = new MovingAlien();
            return enemy;
        } else if (type === EnemyTypes.ARMED_ALIEN) {
            let enemy = new ArmedAlien();
            return enemy;
        }
        return null;
    }

}

export { EnemyFactory, EnemyTypes }