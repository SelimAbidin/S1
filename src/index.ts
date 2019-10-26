import { Application, Texture } from "pixi.js";
import { Stars } from "./Stars/index"
import { AssetsProvider } from "./AssetsProvider";
import { AssetsProviderEventType, AssetsProviderProgressEvent } from "./events/AssetsProviderEvent";
import { Text } from './views/Text'


const htmlElement: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;

const app = new Application({
    view: htmlElement,
    width: 500,
});


let provider: AssetsProvider = new AssetsProvider(app.loader);
provider.loadTexture('bunny', 'assets/background.jpg');
provider.loadTexture('fighter', 'assets/fighter.png');

provider.on(AssetsProviderEventType.START, (event: AssetsProviderProgressEvent) => {
    console.log(event);
});

provider.on(AssetsProviderEventType.PROGRESS, (event: AssetsProviderProgressEvent) => {
    console.log(event);
});

(window as any).app = app


function init() {

    const texture = Texture.from("assets/background.jpg");

    let stars = new Stars(texture, app.screen.width, app.screen.height);
    app.stage.addChild(stars.getView())
    stars.setMoveSpeed(0, 1);

    let startText = new Text("Tab to Start");
    let startTextX = (app.screen.width - startText.width) / 2;
    let startTextY = (app.screen.height - startText.height) / 2;
    startText.setPosition(startTextX, startTextY);
    let view = startText.getView();
    app.stage.addChild(view);

    app.ticker.add((deltaTime) => {
        stars.update(deltaTime);
    });


    app.stage.interactive = true;
    app.stage.buttonMode = true;

    app.stage.once('click', () => {
        app.stage.interactive = false;
        app.stage.buttonMode = false;
        startText.visible = false;
    })

    // let startText = new StartText("Tap to Start");
    // app.stage.addChild(startText.getView());
}




init();

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


