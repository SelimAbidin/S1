import { Bullet } from "../display/bullets/Bullet";
import { Pooler } from "../utils/Pooler";
import { BulletType } from "../factories/BulletFactory";
import { Container } from "pixi.js";
import { IBullet } from "../display/bullets/IBullet";


class BulletManager {


    private bulletList: IBullet[] = [];
    constructor(private stage: Container, private pooler: Pooler) {

    }

    getList(): IBullet[] {
        return this.bulletList;
    }

    removeBullet(bullet: IBullet) {
        this.pooler.release(BulletType.LASER, bullet);
        this.stage.removeChild(bullet.getChildView());
        let index = this.bulletList.indexOf(bullet);
        this.bulletList.splice(index, 1);
    }

    createBulletAt(x: number, y: number, type: BulletType): IBullet {
        let bullet: IBullet = this.pooler.getNext(type) as IBullet;
        bullet.x = x;
        bullet.y = y;
        this.stage.addChild(bullet.getChildView());
        this.bulletList.push(bullet);
        return bullet;
    }

    removeAll() {
        while (this.bulletList.length > 0) {
            this.removeBullet(this.bulletList[0]);
        }
    }

    update(deltaTime: number) {
        const bulletList = this.bulletList;
        for (let i = 0; i < bulletList.length; i++) {
            const bullet = bulletList[i];
            bullet.update(deltaTime);
            if (bullet.y < -bullet.height) {
                this.removeBullet(bulletList[i]);
                i--;
            }
        }

    }
}

export { BulletManager }