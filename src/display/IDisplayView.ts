

interface IDisplayView {
    width: number;
    height: number;
    x: number;
    y: number;
    getChildView(): any;
}


interface IAnimatable {
    gotoAndStop(v: number): void;
    onComplete?: Function;
    gotoAndPlay(frame: number): void;
}

interface IEngineView {
    width: number;
    height: number;
    x: number;
    y: number;
}

export { IDisplayView, IEngineView, IAnimatable }