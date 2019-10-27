import { Bullet } from "../display/bullets/Bullet";
import { IBullet } from "../display/bullets/IBullet";
import { AlienBullet } from "../display/bullets/AlienBullet";
import { Texture, Sprite } from "pixi.js";
import { IEngineView } from "../display/IDisplayView";


let TEXTURES: any = {}

function getTexture(str: string): any {

    if (TEXTURES[str] === undefined) {
        TEXTURES[str] = Texture.from(str);
    }
    return TEXTURES[str];
}


enum BulletType {
    LASER = 'LASER',
    ALIEN_BULLET = 'alienBullet'
}

class BulletFactory {
    constructor() {

    }

    public createBulletByType(type: BulletType): IBullet | null {

        if (type === BulletType.LASER) {
            const texture = getTexture("bullet");
            let view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 0;

            let bullet = new Bullet(view as IEngineView);
            bullet.hitEnemy = true;
            return bullet;
        } else if (type === BulletType.ALIEN_BULLET) {

            const texture = getTexture("alien_bullet");
            let view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 0;

            let bullet = new AlienBullet(view);
            bullet.hitEnemy = false;
            return bullet;
        }

        return null;
    }
}

export { BulletFactory, BulletType }