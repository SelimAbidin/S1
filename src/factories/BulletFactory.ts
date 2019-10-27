import { Bullet } from "../Bullet";

enum BulletType {
    LASER = 'LASER'
}

class BulletFactory {


    constructor() {

    }

    public createBulletByType(type: BulletType) {

        if (type === BulletType.LASER) {
            let bullet = new Bullet();
            return bullet;
        }

        return null;
    }




}

export { BulletFactory, BulletType }