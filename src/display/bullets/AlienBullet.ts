import { Bullet } from "./Bullet";
import { IEngineView } from "../IDisplayView";


class AlienBullet extends Bullet {

    constructor(view: IEngineView) {
        super(view);
        this.speed = 10;
    }

}

export { AlienBullet }