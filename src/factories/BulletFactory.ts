import { Bullet } from "../display/bullets/Bullet";
import { IBullet } from "../display/bullets/IBullet";
import { AlienBullet } from "../display/bullets/AlienBullet";

enum BulletType {
    LASER = 'LASER',
    ALIEN_BULLET = 'alienBullet'
}

class BulletFactory {
    constructor() {

    }

    public createBulletByType(type: BulletType): IBullet | null {

        if (type === BulletType.LASER) {
            let bullet = new Bullet();
            bullet.hitEnemy = true;
            return bullet;
        } else if (type === BulletType.ALIEN_BULLET) {
            let bullet = new AlienBullet();
            bullet.hitEnemy = false;
            return bullet;
        }

        return null;
    }
}

export { BulletFactory, BulletType }