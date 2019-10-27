import { Sprite, Texture } from "pixi.js";


class Bullet {

    private view: any;
    private speed: number = 20;
    constructor() {
        const texture = Texture.from("bullet");
        this.view = new Sprite(texture);
        this.view.anchor.set(0.5);
        this.view.zIndex = 0;
    }

    getView() {
        return this.view;
    }

    setPosition(x: number, y: number) {
        this.view.x = x;
        this.view.y = y;
    }

    update(deltaTime: number) {
        this.view.y -= this.speed * deltaTime;
    }
}

export { Bullet }