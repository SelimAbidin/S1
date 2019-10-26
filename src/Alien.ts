import { Texture, Sprite } from "pixi.js";


class Alien {

    private view: any;
    constructor() {
        const texture = Texture.from("alien");
        this.view = new Sprite(texture);
        this.view.anchor.set(0.5);
        this.view.zIndex = 10;
    }

    getView() {
        return this.view;
    }

    setPosition(x: number, y: number) {
        this.view.x = x;
        this.view.y = y;
    }

    update(deltaTime: number) {
        this.view.y += 1 * deltaTime;
    }
}

export { Alien }