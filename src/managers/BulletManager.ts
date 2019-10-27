import { Bullet } from "../Bullet";
import { Pooler } from "../utils/Pooler";
import { BulletType } from "../factories/BulletFactory";
import { Container } from "pixi.js";


class BulletManager {


    private bulletList: Bullet[] = [];
    constructor(private stage: Container, private pooler: Pooler) {

    }

    getList(): Bullet[] {
        return this.bulletList;
    }

    removeBullet(bullet: Bullet) {
        this.pooler.release(BulletType.LASER, bullet);
        this.stage.removeChild(bullet.getView());
        let index = this.bulletList.indexOf(bullet);
        this.bulletList.splice(index, 1);
    }

    createBulletAt(x: number, y: number, type: BulletType) {
        let bullet: Bullet = this.pooler.getNext(type) as Bullet;
        bullet.setPosition(x, y);
        this.stage.addChild(bullet.getView());
        this.bulletList.push(bullet);
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
            if (bullet.getView().y < -bullet.getView().height) {
                this.removeBullet(bulletList[i]);
                i--;
            }
        }

    }
}

export { BulletManager }