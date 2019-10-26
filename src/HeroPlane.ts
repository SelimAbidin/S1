import { Application, Texture, AnimatedSprite } from "pixi.js";

class HeroPlane {

    private view: any;
    private nextX: number = 0;
    private nextY: number = 0;
    public allowFire: boolean = false;
    constructor() {

        const frames = [];
        for (let i = 0; i < 30; i++) {
            const val = i < 10 ? `0${i}` : i;
            frames.push(Texture.from(`rollSequence00${val}.png`));
        }

        const anim = new AnimatedSprite(frames);
        anim.animationSpeed = 0.5;
        anim.anchor.set(0.5);
        anim.zIndex = 100;
        // anim.play();
        // anim.gotoAndStop(0)
        // (window as any).anim = anim;
        this.view = anim

    }

    get height(): number {
        return this.view.height;
    }

    setPosition(x: number, y: number) {
        this.nextX = x;
        this.nextY = y;
    }

    getView() {
        return this.view
    }

    resetFire() {
        this.needsFire = false;
        this.fireCounter = 0;
    }

    fireCounter: number = 0;
    needsFire: boolean = true;
    update(deltaTime: number) {

        this.fireCounter += deltaTime;
        if (this.fireCounter > 5) {
            this.needsFire = true;
        }

        let speedX = ((this.view.x - this.nextX) / 10);
        this.view.gotoAndStop(Math.min(Math.abs(speedX), 6) * -Math.sign(speedX))
        this.view.x -= speedX * deltaTime;
        this.view.y -= ((this.view.y - this.nextY) / 10) * deltaTime;
    }
}

export { HeroPlane }