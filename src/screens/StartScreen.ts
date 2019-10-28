import { Rectangle, Text, TextStyle } from "pixi.js";

class StartScreen {

    public view: any;
    constructor(rect: Rectangle) {

        const style = new TextStyle({
            dropShadow: true,
            dropShadowAngle: 0,
            dropShadowBlur: 4,
            dropShadowColor: "#ffffff",
            dropShadowDistance: 0,
            fill: ["#8184b3", "#070140"],
            fontFamily: "Arial",
            fontSize: 60,
            fontWeight: "bold",
            stroke: "#070140",
            strokeThickness: 5,

        });

        const startText = new Text("Tap to Start", style);
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

export { StartScreen };
