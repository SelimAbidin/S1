import { IBullet } from "../display/bullets/IBullet";
import { IEnemy } from "../display/enemies/IEnemy";
import { HeroPlane } from "../display/HeroPlane";
import { GameModel } from "../GameModel";
import { BulletManager } from "./BulletManager";
import { EnemyManager } from "./EnemyManager";

function distance(x: number, y: number, x2: number, y2: number): number {
    const dx = x - x2;
    const dy = y - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

class CollisionManager {

    private tick: number = 0;
    constructor(
        private readonly gameMode: GameModel,
        private readonly enemyManager: EnemyManager,
        private readonly bulletManager: BulletManager,
        private readonly hero: HeroPlane) { }

    public update(deltaTime: number) {

        this.tick += 1;
        if (this.tick % 2) {

            const enemyList: IEnemy[] = this.enemyManager.getList();
            const bulletList: IBullet[] = this.bulletManager.getList();

            for (let i = 0; i < bulletList.length; i++) {
                const bullet = bulletList[i];
                if (!bullet.hitEnemy) {
                    const dist = distance(bullet.x, bullet.y, this.hero.x, this.hero.y);
                    if (dist < (bullet.width + this.hero.width) / 2) {
                        this.bulletManager.removeBullet(bullet);
                        this.gameMode.removeLife();
                        return;
                    }
                }
            }

            for (let i = 0; i < enemyList.length; i++) {
                const enemy = enemyList[i];

                const heroEnemyDist = distance(enemy.x, enemy.y, this.hero.x, this.hero.y);

                if (heroEnemyDist < (enemy.width + this.hero.width) / 2) {
                    this.gameMode.removeLife();
                    break;
                }

                for (let j = 0; j < bulletList.length; j++) {
                    const bullet = bulletList[j];
                    if (bullet.hitEnemy) {
                        const dist = distance(bullet.x, bullet.y, enemy.x, enemy.y);
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

export { CollisionManager };
