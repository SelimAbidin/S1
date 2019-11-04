import { Container } from "pixi.js";
import { ArmedAlien } from "../display/enemies/ArmedAlien";
import { IEnemy } from "../display/enemies/IEnemy";
import { EffectType } from "../factories/EffectFactory";
import { EnemyTypes } from "../factories/EnemyFactory";
import { GameModel } from "../GameModel";
import { Pooler } from "../utils/Pooler";
import { BulletManager } from "./BulletManager";
import { EffectManager } from "./EffectManager";

class EnemyManager {

    private enemyList: IEnemy[] = [];
    private enemyCounter: number = 20;
    constructor(
        private readonly gameModel: GameModel,
        private readonly bulletManager: BulletManager,
        private readonly effectManager: EffectManager,
        private readonly stage: Container,
        private pooler: Pooler) {
    }

    public createEnemyAt(x: number, y: number, type: EnemyTypes) {

        const enemy: IEnemy = this.pooler.getNext(type) as IEnemy;

        // console.log("type : ", type, enemy.type);

        enemy.x = x;
        enemy.y = y;
        this.stage.addChild(enemy.getChildView());
        this.enemyList.push(enemy);
    }

    public removeEnemy(enemy: IEnemy) {
        this.pooler.release(enemy.type, enemy);
        this.stage.removeChild(enemy.getChildView());
        const index = this.enemyList.indexOf(enemy);
        this.enemyList.splice(index, 1);
        this.gameModel.addToScore(10);

    }

    public explodeEnemy(enemy: IEnemy) {
        this.removeEnemy(enemy);
        this.effectManager.createEffectAt(enemy.x, enemy.y, EffectType.EXPLOTION);
    }

    public getList(): IEnemy[] {
        return this.enemyList;
    }

    public removeAll() {
        while (this.enemyList.length > 0) {
            this.removeEnemy(this.enemyList[0]);
        }
    }

    public explodeAll() {
        while (this.enemyList.length > 0) {
            this.explodeEnemy(this.enemyList[0]);
        }
    }

    public update(deltaTime: number) {
        const enemyList = this.enemyList;
        this.enemyCounter += deltaTime;
        if (this.enemyCounter > 10) {
            const types = Object.keys(EnemyTypes);
            const values = Object.values(EnemyTypes);
            const enemyIndex = Math.floor(Math.random() * types.length);
            this.createEnemyAt((Math.random() * 450) + 50, -100, values[enemyIndex] as EnemyTypes);
            this.enemyCounter = 0;
        }

        for (let i = 0; i < enemyList.length; i++) {
            const enemy = enemyList[i];
            enemy.update(deltaTime);

            if (enemy instanceof ArmedAlien) {

                if (enemy.needsFire) {
                    const bullet = this.bulletManager.createBulletAt(enemy.x, enemy.y, enemy.bulletType);
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

export { EnemyManager };
