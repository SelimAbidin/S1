import { Sprite, Texture } from "pixi.js";
import { Alien } from "../display/enemies/Alien";
import { ArmedAlien } from "../display/enemies/ArmedAlien";
import { IEnemy } from "../display/enemies/IEnemy";
import { MovingAlien } from "../display/enemies/MovingAlien";

enum EnemyTypes {
    ALIEN = "alien",
    MOVING_ALIEN = "movingAlien",
    ARMED_ALIEN = "ArmedAlien",
}

const TEXTURES: any = {};

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
            const view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 10;
            const enemy = new Alien(view);
            enemy.type = EnemyTypes.ALIEN;
            return enemy;
        } else if (type === EnemyTypes.MOVING_ALIEN) {

            const texture = getTexture("alien");
            const view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 10;
            const enemy = new MovingAlien(view);
            enemy.type = EnemyTypes.MOVING_ALIEN;
            return enemy;
        } else if (type === EnemyTypes.ARMED_ALIEN) {
            const texture = getTexture("alien");
            const view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 10;
            const enemy = new ArmedAlien(view);
            enemy.type = EnemyTypes.ARMED_ALIEN;
            return enemy;
        }
        return null;
    }

}

export { EnemyFactory, EnemyTypes };
