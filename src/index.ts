import {Application, TilingSprite, Texture, Sprite} from 'pixi.js'



const htmlElement:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("gameCanvas");

const app = new Application({
    view: htmlElement,
    width:500,
    height:500,
});




const texture = Texture.from('assets/background.jpg');



let tileSprite = new TilingSprite(
    texture, 
    app.screen.width,
    app.screen.height,
)

// const bunny = new Sprite(texture);
// bunny.x = 0
// bunny.y = 0
// bunny.width = 500
// bunny.height = 500

app.stage.addChild(tileSprite)

app.ticker.add((deltaTime) => {
    tileSprite.tilePosition.y += 1 * deltaTime;
});
