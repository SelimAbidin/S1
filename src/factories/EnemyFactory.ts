import { Alien } from "../display/enemies/Alien";


enum EnemyTypes {
    ALIEN = 'ALIEN'
}


class EnemyFactory {

    constructor() {

    }

    public createEnemyByType(type: EnemyTypes): any {

        if (type === EnemyTypes.ALIEN) {
            let enemy = new Alien();
            return enemy;
        }

        return null;
    }

}

export { EnemyFactory, EnemyTypes }