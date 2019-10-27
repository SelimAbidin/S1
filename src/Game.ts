import { AssetsProvider, AssetsProviderEventType, AssetsProviderProgressEvent } from "./utils/AssetsProvider";
import { Loader, Application, Texture, Container, Point, AnimatedSprite } from "pixi.js";
import "pixi-sound";


import { Pooler } from "./utils/Pooler";
import { EnemyFactory, EnemyTypes } from "./factories/EnemyFactory";
import { BulletType, BulletFactory } from "./factories/BulletFactory";
import { EffectFactory, EffectType } from "./factories/EffectFactory";
import { Stars } from "./display/Stars"
import { HeroPlane } from "./display/HeroPlane";
import { BulletManager } from "./managers/BulletManager";
import { EnemyManager } from "./managers/EnemyManager";
import { CollisionManager } from "./managers/CollisionManager";
import { StartScreen } from "./screens/StartScreen";
import { GameHUD } from "./screens/GameHUD";
import { GameModel, GameModelEvent } from "./GameModel";
import { GameOverScreen } from "./screens/GameOverScreen";
import { EffectManager } from "./managers/EffectManager";


enum GameStates {
    NOT_STARTED = "NOT_STARTED",
    PLAYING = "PLAYING",
    GAME_OVER = "GAME_OVER",
}

class Game {

    private canvasElement: HTMLCanvasElement;
    private gameWidth: number;
    private gameHeight: number;
    private pooler: Pooler = new Pooler();
    private enemyFactory: EnemyFactory = new EnemyFactory();
    private bulletFactory: BulletFactory = new BulletFactory();
    private effectFactory: EffectFactory = new EffectFactory();
    private bulletManager: BulletManager;
    private enemyManager: EnemyManager;
    private effectManager: EffectManager;
    private collisionManager: CollisionManager;
    private stars: Stars;
    private stage: Container;
    private hero: HeroPlane;
    private pixiApp: Application;
    private startScreen: StartScreen;
    private gameOverScreen: GameOverScreen;
    private provider: AssetsProvider;
    constructor(canvasID: string, width: number, height: number) {
        this.canvasElement = document.getElementById(canvasID) as HTMLCanvasElement;
        this.gameHeight = height;
        this.gameWidth = width;

        this.onFrame = this.onFrame.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        let provider: AssetsProvider = this.loadAssets(Loader.shared);

        provider.on(AssetsProviderEventType.PROGRESS, (event: AssetsProviderProgressEvent) => {
            this.setProcess(event.progress);
        });

        provider.on(AssetsProviderEventType.COMPLETE, (_event: AssetsProviderProgressEvent) => {
            this.init();
        });

        this.provider = provider;

        provider.load();
    }

    private init(): void {

        let pooler: Pooler = new Pooler();
        this.pooler = pooler;

        let pool: Pooler = this.pooler;

        let enemyTypes = Object.values(EnemyTypes);
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < enemyTypes.length; j++) {
                let type: EnemyTypes = enemyTypes[j];
                let enemy = this.enemyFactory.createEnemyByType(type);
                pool.add(type, enemy);
            }
        }

        let bulletTypes = Object.values(BulletType);
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < bulletTypes.length; j++) {
                let type: BulletType = bulletTypes[j];
                let bullet = this.bulletFactory.createBulletByType(type);
                pool.add(type, bullet);
            }
        }

        let effectTypes = Object.values(EffectType);
        for (let i = 0; i < 200; i++) {
            for (let j = 0; j < effectTypes.length; j++) {
                let type: EffectType = effectTypes[j];
                let effect = this.effectFactory.createEffectByType(type);
                pool.add(type, effect);
            }
        }


        this.install();

        this.stage.interactive = true;

        this.setGameState(GameStates.NOT_STARTED);
    }
    private gameModel: GameModel;
    private currentState: GameStates;
    setGameState(states: GameStates) {

        if (this.currentState === GameStates.NOT_STARTED) {
            this.startScreen.visible = false;
        } else if (this.currentState === GameStates.GAME_OVER) {
            this.gameOverScreen.visible = false;
        }

        if (states === GameStates.NOT_STARTED) {
            this.startScreen.visible = true;
            this.stage.once('click', () => {
                this.setGameState(GameStates.PLAYING);
            })
        } else if (states === GameStates.PLAYING) {
            this.resetGame();
        } else if (states === GameStates.GAME_OVER) {
            this.gameOverScreen.visible = true;
            this.stage.once('click', () => {
                this.setGameState(GameStates.PLAYING);
            })
        }

        this.currentState = states;

    }

    resetGame() {
        this.hero.x = this.pixiApp.screen.width / 2;
        this.hero.y = this.pixiApp.screen.height + this.hero.height;
        this.enemyManager.removeAll();
        this.bulletManager.removeAll();
        this.gameModel.reset();
    }

    onMouseUp(_event: MouseEvent) {
        this.hero.allowFire = false;
    }

    onMouseDown(_event: any) {
        this.hero.allowFire = true;
    }

    onMouseMove(event: any) {
        let point: Point = event.data.global;
        this.hero.setPosition(point.x, point.y);
    }

    install() {

        const app = new Application({
            view: this.canvasElement,
            width: this.gameWidth,
            height: this.gameHeight,
            resolution: window.devicePixelRatio || 1,
        });
        app.stage.sortableChildren = true;
        this.pixiApp = app;
        this.stage = app.stage;

        this.stage.on('mousemove', this.onMouseMove);
        this.stage.on('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);

        this.gameModel = new GameModel();
        this.gameModel.on(GameModelEvent.LIFE_CHANGE, (event: { life: number }) => {

            if (event.life < 3) {
                this.effectManager.createEffectAt(this.hero.x, this.hero.y, EffectType.EXPLOTION);
                this.hero.x = this.pixiApp.screen.width / 2;
                this.hero.y = this.pixiApp.screen.height + this.hero.height;
                this.bulletManager.removeAll();
                this.enemyManager.explodeAll();
                this.provider.playSound("explosionSound");
            }
        })

        this.gameModel.on(GameModelEvent.HIGH_SCORE_CHANGE, (event: { score: number }) => {
            document.cookie = event.score.toString();
        })

        this.gameModel.on(GameModelEvent.GAME_OVER, (_event: { life: number }) => {
            this.setGameState(GameStates.GAME_OVER);
        })



        const frames = [];
        for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            frames.push(Texture.from(`rollSequence00${val}.png`));
        }

        const anim = new AnimatedSprite(frames);
        anim.anchor.set(0.5);
        anim.zIndex = 100;

        let hero = new HeroPlane(anim);
        hero.x = this.pixiApp.screen.width / 2;
        hero.y = this.pixiApp.screen.height + hero.height;
        hero.width *= 0.5;
        hero.height *= 0.5;
        this.stage.addChild(hero.getChildView() as any);
        this.hero = hero;


        const texture = Texture.from("background");
        this.stars = new Stars(texture, this.gameWidth, this.gameHeight);
        this.stars.setMoveSpeed(0, 5);
        this.stage.addChild(this.stars.getView());



        let rect = this.pixiApp.screen.clone();
        this.startScreen = new StartScreen(rect);
        this.startScreen.visible = false;
        this.stage.addChild(this.startScreen.view);


        let gameHud = new GameHUD(this.gameModel, rect);
        this.stage.addChild(gameHud.view);

        let gameOverScreen = new GameOverScreen(rect);
        gameOverScreen.visible = false;
        this.gameOverScreen = gameOverScreen;
        this.stage.addChild(gameOverScreen.view);

        this.bulletManager = new BulletManager(this.stage, this.pixiApp.screen, this.pooler);
        this.effectManager = new EffectManager(this.pooler, this.provider, this.stage);
        this.enemyManager = new EnemyManager(this.gameModel, this.bulletManager, this.effectManager, this.stage, this.pooler);

        this.collisionManager = new CollisionManager(this.gameModel, this.enemyManager, this.bulletManager, this.hero);

        app.ticker.add(this.onFrame)
    }

    onFrame(deltaTime: number) {
        this.stars.update(deltaTime);

        if (this.currentState === GameStates.PLAYING) {
            this.hero.update(deltaTime);

            if (this.hero.allowFire) {
                if (this.hero.needsFire) {
                    this.hero.resetFire();
                    this.bulletManager.createBulletAt(this.hero.x, this.hero.y, this.hero.bulletType);
                    this.provider.playSound("laserSound");
                }
            }

            this.enemyManager.update(deltaTime);
            this.bulletManager.update(deltaTime);
            this.collisionManager.update(deltaTime);
        }

        this.effectManager.update(deltaTime);

    }

    private setProcess(progress: number) {
        console.log(`Loading (${Math.round((progress / 100) * 100)}%)`);
    }

    private loadAssets(loader: Loader): AssetsProvider {
        let provider: AssetsProvider = new AssetsProvider(loader);
        // provider.loadTexture('mainship', 'assets/ship.png');
        provider.loadTexture('background', 'assets/background.jpg');
        // provider.loadTexture('fighter', 'assets/fighter.png');
        provider.loadTexture('bullet', 'assets/bullet.png');
        provider.loadTexture('alien_bullet', 'assets/alienBullet.png');
        provider.loadTexture('heart', 'assets/heart.png');
        provider.loadTexture('alien', 'assets/alien.png');
        provider.loadSound('laserSound', 'assets/sound/laser.mp3');
        provider.loadSound('explosionSound', 'assets/sound/explosion.mp3');
        provider.loadAnimJSON('assets/fighter.json');
        provider.loadAnimJSON('assets/mc.json');
        return provider;
    }

}

export { Game }