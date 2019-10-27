import { Rectangle, TextStyle, Text } from "pixi.js";


class GameOverScreen {

    public view: any;
    constructor(rect: Rectangle) {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 60,
            fontWeight: 'bold',
            fill: ['#8184b3', '#070140'],
            stroke: '#070140',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 4,
            dropShadowAngle: 0,
            dropShadowDistance: 0,
        });

        let startText = new Text("Game Over", style);
        startText.x = (rect.width - startText.width) / 2;
        startText.y = (rect.height - startText.height) / 2;
        startText.zIndex = 100;
        this.view = startText;
    }

    set visible(b: boolean) {
        this.view.visible = b;
    }
    get visible(): boolean {
        return this.view.visible;
    }

}

export { GameOverScreen }