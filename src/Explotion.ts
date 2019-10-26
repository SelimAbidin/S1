import { Application, Texture, AnimatedSprite } from "pixi.js";

class Explotion {

    private view: any;
    private nextX: number = 0;
    private nextY: number = 0;
    public allowFire: boolean = false;
    public needsToClean: boolean = true;
    constructor() {

        const frames = [];
        for (let i = 0; i < 26; i++) {
            frames.push(Texture.from(`Explosion_Sequence_A ${i + 1}.png`));
        }

        const anim = new AnimatedSprite(frames);
        anim.animationSpeed = 0.5;
        anim.anchor.set(0.5);
        anim.zIndex = 100;
        anim.loop = false;
        anim.gotoAndStop(0)
        anim.onComplete = this.onComplete.bind(this);
        this.view = anim

    }

    private onComplete() {
        this.needsToClean = true;
    }

    get height(): number {
        return this.view.height;
    }

    reset() {
        this.needsToClean = false;
        this.view.gotoAndPlay(0);
    }

    setPosition(x: number, y: number) {
        this.nextX = x;
        this.nextY = y;
    }

    getView() {
        return this.view
    }

    resetFire() {
    }

    update(deltaTime: number) {
    }
}

export { Explotion }