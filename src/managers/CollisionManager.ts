import { EnemyManager } from "./EnemyManager";
import { BulletManager } from "./BulletManager";
import { HeroPlane } from "../display/HeroPlane";
import { GameModel } from "../GameModel";
import { IEnemy } from "../display/enemies/IEnemy";
import { IBullet } from "../display/bullets/IBullet";


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
            let bulletList: IBullet[] = this.bulletManager.getList();


            for (let i = 0; i < bulletList.length; i++) {
                const bullet = bulletList[i];
                if (!bullet.hitEnemy) {
                    let dist = distance(bullet.x, bullet.y, this.hero.x, this.hero.y);
                    if (dist < (bullet.width + this.hero.width) / 2) {
                        this.bulletManager.removeBullet(bullet);
                        this.gameMode.removeLife();
                        return;
                    }
                }
            }


            for (let i = 0; i < enemyList.length; i++) {
                const enemy = enemyList[i];

                let heroEnemyDist = distance(enemy.x, enemy.y, this.hero.x, this.hero.y)

                if (heroEnemyDist < (enemy.width + this.hero.width) / 2) {
                    this.gameMode.removeLife();
                    break;
                }

                for (let j = 0; j < bulletList.length; j++) {
                    const bullet = bulletList[j];
                    if (bullet.hitEnemy) {
                        let dist = distance(bullet.x, bullet.y, enemy.x, enemy.y);
                        if (dist < (bullet.width + enemy.width) / 2) {
                            this.bulletManager.removeBullet(bullet);
                            this.enemyManager.explodeEnemy(enemy);
                        }
                    }

                }
            }
        }
    }
}

export { CollisionManager }