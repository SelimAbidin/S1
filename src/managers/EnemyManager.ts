import { Pooler } from "../utils/Pooler";
import { Container, utils } from "pixi.js";
import { EnemyTypes } from "../factories/EnemyFactory";
import { GameModel } from "../GameModel";
import { EffectManager } from "./EffectManager";
import { EffectType } from "../factories/EffectFactory";
import { IEnemy, IArmedEnemy } from "../display/enemies/IEnemy";
import { ArmedAlien } from "../display/enemies/ArmedAlien";
import { BulletManager } from "./BulletManager";

class EnemyManager {

    private enemyList: IEnemy[] = [];
    private enemyCounter: number = 20;
    constructor(private readonly gameModel: GameModel, private readonly bulletManager: BulletManager, private readonly effectManager: EffectManager, private readonly stage: Container, private pooler: Pooler) {
    }

    createEnemyAt(x: number, y: number, type: EnemyTypes) {
        let enemy: IEnemy = this.pooler.getNext(type) as IEnemy;
        enemy.x = x;
        enemy.y = y;
        this.stage.addChild(enemy.getChildView());
        this.enemyList.push(enemy);
    }

    removeEnemy(enemy: IEnemy) {
        this.pooler.release(EnemyTypes.ALIEN, enemy);
        this.stage.removeChild(enemy.getChildView());
        let index = this.enemyList.indexOf(enemy);
        this.enemyList.splice(index, 1);
        this.gameModel.addToScore(10);

    }

    explodeEnemy(enemy: IEnemy) {
        this.removeEnemy(enemy);
        this.effectManager.createEffectAt(enemy.x, enemy.y, EffectType.EXPLOTION);
    }

    getList(): IEnemy[] {
        return this.enemyList;
    }

    removeAll() {
        while (this.enemyList.length > 0) {
            this.removeEnemy(this.enemyList[0]);
        }
    }

    explodeAll() {
        while (this.enemyList.length > 0) {
            this.explodeEnemy(this.enemyList[0]);
        }
    }

    update(deltaTime: number) {
        const enemyList = this.enemyList;
        this.enemyCounter += deltaTime;
        if (this.enemyCounter > 10) {
            let types = Object.keys(EnemyTypes);
            let values = Object.values(EnemyTypes);
            let enemyIndex = Math.floor(Math.random() * types.length);
            this.createEnemyAt(Math.random() * 800, -100, values[enemyIndex] as EnemyTypes);
            this.enemyCounter = 0;
        }

        for (let i = 0; i < enemyList.length; i++) {
            const enemy = enemyList[i];
            enemy.update(deltaTime);
            // console.log(enemy as IArmedEnemy);

            if (enemy instanceof ArmedAlien) {

                if (enemy.needsFire) {
                    let bullet = this.bulletManager.createBulletAt(enemy.x, enemy.y, enemy.bulletType);
                    bullet.setVelocity(0, 1);
                    enemy.resetFire();
                }

            }

            if (enemy.y > 800 + 100) {
                this.removeEnemy(enemyList[i]);
                i--;
            }
        }

    }
}

export { EnemyManager }