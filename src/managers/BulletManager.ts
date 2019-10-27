import { Container, Rectangle } from "pixi.js";
import { IBullet } from "../display/bullets/IBullet";
import { BulletType } from "../factories/BulletFactory";
import { Pooler } from "../utils/Pooler";

class BulletManager {

    private bulletList: IBullet[] = [];
    constructor(private stage: Container, private rect: Rectangle, private pooler: Pooler) {

    }

    public getList(): IBullet[] {
        return this.bulletList;
    }

    public removeBullet(bullet: IBullet) {
        this.pooler.release(BulletType.LASER, bullet);
        this.stage.removeChild(bullet.getChildView());
        const index = this.bulletList.indexOf(bullet);
        this.bulletList.splice(index, 1);
    }

    public createBulletAt(x: number, y: number, type: BulletType): IBullet {
        const bullet: IBullet = this.pooler.getNext(type) as IBullet;
        bullet.x = x;
        bullet.y = y;
        this.stage.addChild(bullet.getChildView());
        this.bulletList.push(bullet);
        return bullet;
    }

    public removeAll() {
        while (this.bulletList.length > 0) {
            this.removeBullet(this.bulletList[0]);
        }
    }

    public update(deltaTime: number) {
        const bulletList = this.bulletList;
        for (let i = 0; i < bulletList.length; i++) {
            const bullet = bulletList[i];
            bullet.update(deltaTime);


            if (bullet.y < -bullet.height || bullet.y > (this.rect.height + bullet.height)) {
                this.removeBullet(bulletList[i]);
                i--;
            }
        }

    }
}

export { BulletManager };
