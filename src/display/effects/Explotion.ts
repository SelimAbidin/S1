import { Texture, AnimatedSprite } from "pixi.js";
import { Object2D } from "../Object2D";
import { IEngineView, IAnimatable } from "../IDisplayView";

class Explotion extends Object2D {

    public allowFire: boolean = false;
    public needsToClean: boolean = true;
    constructor(view: IEngineView & IAnimatable) {
        super(view);
        view.onComplete = this.onComplete.bind(this);
    }

    private onComplete() {
        this.needsToClean = true;
    }

    get height(): number {
        return this.view.height;
    }

    reset() {
        this.needsToClean = false;
        (this.view as IAnimatable & IEngineView).gotoAndPlay(0);
    }
}

export { Explotion }