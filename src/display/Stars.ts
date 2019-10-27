import { Texture, TilingSprite } from "pixi.js";

export class Stars {

    private view: TilingSprite;
    private speedX: number = 0;
    private speedY: number = 0;
    constructor(texture: Texture, width: number, height: number) {
        this.view = new TilingSprite(
            texture,
            width,
            height,
        );
    }

    public getView() {
        return this.view;
    }

    public setMoveSpeed(x: number, y: number): void {
        this.speedX = x;
        this.speedY = y;
    }

    public update(deltaTime: number): void {
        this.view.tilePosition.y += this.speedY * deltaTime;
        this.view.tilePosition.x += this.speedX * deltaTime;
    }
}
