import { IEngineView } from "./IDisplayView";


class Object2D {

    constructor(protected view: IEngineView) { }

    set x(x: number) {
        this.view.x = x;
    }

    set y(y: number) {
        this.view.y = y;
    }

    set width(width: number) {
        this.view.width = width;
    }

    set height(height: number) {
        this.view.height = height;
    }

    get x(): number {
        return this.view.x;
    }

    get y(): number {
        return this.view.y;
    }

    get width(): number {
        return this.view.width;
    }

    get height(): number {
        return this.view.height;
    }

    getChildView() {
        return this.view;
    }

}

export { Object2D }