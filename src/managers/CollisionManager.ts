import { EnemyManager } from "./EnemyManager";
import { BulletManager } from "./BulletManager";
import { Bullet } from "../display/bullets/Bullet";
import { HeroPlane } from "../display/HeroPlane";
import { GameModel } from "../GameModel";
import { IEnemy } from "../display/enemies/IEnemy";


function distance(x: number, y: number, x2: number, y2: number): number {
    let dx = x - x2;
    let dy = y - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

class CollisionManager {

    private tick: number = 0;
    constructor(private readonly gameMode: GameModel, private readonly enemyManager: EnemyManager, private readonly bulletManager: BulletManager, private readonly hero: HeroPlane) { }
    update(_deltaTime: number) {

        this.tick += 1;
        if (this.tick % 2) {

            let enemyList: IEnemy[] = this.enemyManager.getList();
            let bulletList: Bullet[] = this.bulletManager.getList();

            for (let i = 0; i < enemyList.length; i++) {
                const enemy = enemyList[i];

                let heroEnemyDist = distance(enemy.x, enemy.y, this.hero.x, this.hero.y)

                if (heroEnemyDist < (enemy.width + this.hero.width) / 2) {
                    this.gameMode.removeLife();
                    break;
                }


                for (let j = 0; j < bulletList.length; j++) {
                    const bullet = bulletList[j];
                    let dist = distance(bullet.getView().x, bullet.getView().y, enemy.x, enemy.y);

                    if (dist < (bullet.getView().width + enemy.width) / 2) {
                        this.bulletManager.removeBullet(bullet);
                        this.enemyManager.removeEnemy(enemy);
                    }
                }


            }
        }
    }
}

export { CollisionManager }