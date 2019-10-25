import { AnimatedSprite, Application, Texture, Loader, LoaderResource } from "pixi.js";
import { Stars } from "./Stars/index"
import { AssetsProvider } from "./AssetsProvider";
import { AssetsProviderEventType, AssetsProviderProgressEvent } from "./events/AssetsProviderEvent";

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

// loader.add('bunny', 'assets/background.jpg')


// app.loader.onComplete.add(() => {
//     console.log("Complete");
// })

// app.loader.add('bunny', 'assets/background.jpg')


// app.loader.load(() => {
//     console.log("Load");
// })

// app.loader.onComplete.add(() => {
//     console.log("ON COMPLETE");
// });

// app.loader.onError.add(() => {
//     console.log("ON ERROR");
// })

// app.loader.onProgress.add((loader: Loader, resources: LoaderResource) => {
//     console.log("ON PROGRESS", loader.progress, resources);
// });

(window as any).app = app


function init() {

    const texture = Texture.from("assets/background.jpg");


    let stars = new Stars(texture, app.screen.width, app.screen.height);
    app.stage.addChild(stars.getView())
    stars.setMoveSpeed(0, 1);

    app.ticker.add((deltaTime) => {

        stars.update(deltaTime);
        // tileSprite.tilePosition.y += 1 * deltaTime;
    });
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


