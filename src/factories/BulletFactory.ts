import { Sprite, Texture } from "pixi.js";
import { AlienBullet } from "../display/bullets/AlienBullet";
import { Bullet } from "../display/bullets/Bullet";
import { IBullet } from "../display/bullets/IBullet";
import { IEngineView } from "../display/IDisplayView";

const TEXTURES: any = {};

function getTexture(str: string): any {

    if (TEXTURES[str] === undefined) {
        TEXTURES[str] = Texture.from(str);
    }
    return TEXTURES[str];
}

enum BulletType {
    LASER = "LASER",
    ALIEN_BULLET = "alienBullet",
}

class BulletFactory {

    public createBulletByType(type: BulletType): IBullet | null {

        if (type === BulletType.LASER) {
            const texture = getTexture("bullet");
            const view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 0;

            const bullet = new Bullet(view as IEngineView);
            bullet.type = BulletType.LASER;
            bullet.hitEnemy = true;
            return bullet;
        } else if (type === BulletType.ALIEN_BULLET) {

            const texture = getTexture("alien_bullet");
            const view = new Sprite(texture);
            view.anchor.set(0.5);
            view.zIndex = 0;

            const bullet = new AlienBullet(view);
            bullet.type = BulletType.ALIEN_BULLET;
            bullet.hitEnemy = false;
            return bullet;
        }

        return null;
    }
}

export { BulletFactory, BulletType };
