
interface IDisplayView {
    width: number;
    height: number;
    x: number;
    y: number;
    getChildView(): any;
}

interface IAnimatable {
    onComplete?: () => void;
    gotoAndStop(v: number): void;
    gotoAndPlay(frame: number): void;
}

interface IEngineView {
    width: number;
    height: number;
    x: number;
    y: number;
}

export { IDisplayView, IEngineView, IAnimatable };
