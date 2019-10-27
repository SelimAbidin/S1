import { Alien } from "../display/enemies/Alien";
import { IEnemy } from "../display/enemies/IEnemy";
import { MovingAlien } from "../display/enemies/MovingAlien";
import { ArmedAlien } from "../display/enemies/ArmedAlien";
import { Texture, Sprite } from "pixi.js";


enum EnemyTypes {
    ALIEN = 'alien',
    MOVING_ALIEN = 'movingAlien',
    ARMED_ALIEN = 'ArmedAlien',
}

let TEXTURES: any = {}

function getTexture(str: string): any {

    if (TEXTURES[str] === undefined) {
        TEXTURES[str] = Texture.from(str);
    }
    return TEXTURES[str];
}



class EnemyFactory {

    public createEnemyByType(type: EnemyTypes): IEnemy | null {

        if (type === EnemyTypes.ALIEN) {

            const texture = getTexture("alien");
            let view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 10;
            let enemy = new Alien(view);
            return enemy;
        } else if (type === EnemyTypes.MOVING_ALIEN) {

            const texture = getTexture("alien");
            let view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 10;
            let enemy = new MovingAlien(view);
            return enemy;
        } else if (type === EnemyTypes.ARMED_ALIEN) {
            const texture = getTexture("alien");
            let view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 10;
            let enemy = new ArmedAlien(view);
            return enemy;
        }
        return null;
    }

}

export { EnemyFactory, EnemyTypes }