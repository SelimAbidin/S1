import { Application, Texture, AnimatedSprite, interaction, Point, Sprite } from "pixi.js";
const { InteractionEvent } = interaction;

import { Stars } from "./Stars/index"
import { AssetsProvider } from "./AssetsProvider";
import { AssetsProviderEventType, AssetsProviderProgressEvent } from "./events/AssetsProviderEvent";
import { Text } from './views/Text'
import { HeroPlane } from "./HeroPlane";
import { Bullet } from "./Bullet";
import { Pooler } from "./utils/Pooler";
import { Alien } from "./Alien";
import { Explotion } from "./Explotion";


const htmlElement: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;

const app = new Application({
    view: htmlElement,
    width: 500,
    height: 800,
    resolution: window.devicePixelRatio || 1,
});
app.stage.sortableChildren = true;

let provider: AssetsProvider = new AssetsProvider(app.loader);
provider.loadTexture('mainship', 'assets/temp/ship.png');
provider.loadTexture('bunny', 'assets/background.jpg');
provider.loadTexture('fighter', 'assets/fighter.png');
provider.loadTexture('bullet', 'assets/temp/bullet.png');
provider.loadTexture('alien', 'assets/temp/alien.png');
provider.loadAnimJSON('assets/fighter.json');
provider.loadAnimJSON('assets/mc.json');

provider.load();


provider.on(AssetsProviderEventType.START, (event: AssetsProviderProgressEvent) => {
    console.log(event);
});

provider.on(AssetsProviderEventType.PROGRESS, (event: AssetsProviderProgressEvent) => {
    console.log(event);
});

provider.on(AssetsProviderEventType.COMPLETE, (event: AssetsProviderProgressEvent) => {
    console.log(event);
    init();
});

(window as any).app = app

function init() {


    let pool: Pooler = new Pooler();

    for (let i = 0; i < 200; i++) {
        let enemy = new Alien();
        pool.add("alien", enemy);
    }

    for (let i = 0; i < 200; i++) {
        let bullet = new Bullet();
        pool.add("bullet", bullet);
    }

    for (let i = 0; i < 200; i++) {
        let explotion = new Explotion();
        pool.add("explotion", explotion);
    }


    // let sprite = new PIXI.Sprite(sheet.textures["image.png"]);


    const texture = Texture.from("assets/background.jpg");

    let stars = new Stars(texture, app.screen.width, app.screen.height);
    app.stage.addChild(stars.getView())
    stars.setMoveSpeed(0, 1);

    app.stage.interactive = true;
    app.stage.buttonMode = true;


    let hero = new HeroPlane();

    hero.getView().x = app.screen.width / 2;
    hero.getView().y = app.screen.height / 2;


    let startText = new Text("Tab to Start");
    let startTextX = (app.screen.width - startText.width) / 2;
    let startTextY = (app.screen.height - startText.height) / 2;
    startText.setPosition(startTextX, startTextY);
    let view = startText.getView();
    app.stage.addChild(view);

    app.stage.once('click', () => {
        // app.stage.interactive = false;
        app.stage.buttonMode = false;
        startText.visible = false;
        app.stage.addChild(hero.getView());
    })

    app.stage.on('mousedown', () => {
        hero.allowFire = true;
    })

    document.addEventListener('mouseup', () => {
        hero.allowFire = false;
    });


    app.stage.on('mousemove', (event: any) => {
        let point: Point = event.data.global;
        hero.setPosition(point.x, point.y);
        // console.log(point.x, point.y);
    })


    let list: Bullet[] = []
    let enemies: Alien[] = []
    let explotions: Explotion[] = []
    let enemyCounter = 0;
    app.ticker.add((deltaTime) => {


        for (let i = 0; i < explotions.length; i++) {
            const explotion = explotions[i];
            if (explotion.needsToClean) {
                app.stage.removeChild(explotion.getView());
                pool.release("explotion", explotion);
            }
        }


        enemyCounter += deltaTime;
        if (enemyCounter > 10) {
            let enemy = pool.getNext("alien");
            enemies.push(enemy);
            app.stage.addChild(enemy.getView());
            enemy.setPosition(Math.random() * app.screen.width, -100);
            enemyCounter = 0;
        }


        stars.update(deltaTime);

        if (hero.allowFire) {
            if (hero.needsFire) {
                hero.resetFire();
                let bullet = pool.getNext("bullet");
                bullet.setPosition(hero.getView().x, hero.getView().y);
                let view = bullet.getView();
                app.stage.addChild(view);
                list.push(bullet);
            }
        }

        for (let i = 0; i < list.length; i++) {
            const bullet = list[i];
            bullet.update(deltaTime);

            if (bullet.getView().y < -100) {
                app.stage.removeChild(bullet.getView())
                pool.release("bullet", bullet);
                list.splice(i, 1)
                i--;
            }
        }



        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            enemy.update(deltaTime);
        }

        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];

            if (enemy.getView().y > app.screen.height + 100) {
                enemies.splice(i, 1);
                app.stage.removeChild(enemy.getView());
                i--;
                continue;
            }

            for (let j = 0; j < list.length; j++) {
                const bullet = list[j];

                let dx = enemy.getView().x - bullet.getView().x;
                let dy = enemy.getView().y - bullet.getView().y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < (enemy.getView().width + bullet.getView().width) / 2) {
                    list.splice(j, 1)
                    enemies.splice(i, 1);

                    let explotion = pool.getNext("explotion");
                    explotion.getView().x = enemy.getView().x;
                    explotion.getView().y = enemy.getView().y;
                    explotion.reset();
                    explotions.push(explotion);
                    app.stage.addChild(explotion.getView());

                    pool.release("alien", enemy);
                    pool.release("bullet", bullet);
                    app.stage.removeChild(enemy.getView());
                    app.stage.removeChild(bullet.getView());
                    i--;
                    break;
                }
            }

        }

        pool.update();
        hero.update(deltaTime);

    });

    // let startText = new StartText("Tap to Start");
    // app.stage.addChild(startText.getView());
}





// app.loader
//     .add('assets/spritesheet/fighter.json')
//     .load((e) => {

//     });


// const tileSprite = new TilingSprite(
//     texture,
//     app.screen.width,
//     app.screen.height,
// );


// app.stage.addChild(tileSprite);


