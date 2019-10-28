import { Loader, LoaderResource, utils } from "pixi.js";
const EventEmitter = utils.EventEmitter;

enum AssetsProviderEventType {
    COMPLETE = "onComplete",
    START = "onStart",
    PROGRESS = "onProgress",
    ERROR = "onError",
}

type AssetsProviderProgressEvent = {
    progress: number;
    min: number;
    max: number;
};

enum AssetsProviderStatus {
    START = "START",
    COMPLETE = "COMPLETE",
}

type AssetsProviderStatusEvent = {
    status: AssetsProviderStatus;
};

class AssetsProvider extends EventEmitter {
    private assets: Map<string, any> = new Map<string, any>();
    private loader: Loader;
    constructor(loader: Loader) {
        super();
        this.loader = loader;
        loader.onStart.add(this.onStart);
        loader.onComplete.add(this.onComplete);
        loader.onError.add(this.onError);
        loader.onProgress.add(this.onProgress);
    }

    public load() {
        this.loader.load();
    }

    public playSound(key: string) {
        this.loader.resources[key].sound.play();
    }

    public onStart = (_loader: Loader, _resource: LoaderResource) => {

        const event: AssetsProviderStatusEvent = {
            status: AssetsProviderStatus.START,
        };
        this.emit(AssetsProviderEventType.START, event);
    }

    public onComplete = (_loader: Loader, _resource: LoaderResource) => {
        const event: AssetsProviderStatusEvent = {
            status: AssetsProviderStatus.COMPLETE,
        };
        this.emit(AssetsProviderEventType.COMPLETE, event);
    }

    public onError = (_loader: Loader, _resource: LoaderResource) => {
        this.emit(AssetsProviderEventType.ERROR);
    }

    public onProgress = (loader: Loader, _resource: LoaderResource) => {
        const event: AssetsProviderProgressEvent = {
            max: 100,
            min: 0,
            progress: loader.progress,
        };
        this.emit(AssetsProviderEventType.PROGRESS, event);
    }

    public loadTexture(key: string, path: string) {
        const loader = this.loader;
        loader.add(key, path);
    }

    public loadSound(key: string, path: string) {
        const loader = this.loader;
        loader.add(key, path);
    }

    public loadAnimJSON(path: string) {
        const loader = this.loader;
        loader.add(path);
    }

    public addAsset(key: string, asset: any): void {
        const assets = this.assets;
        if (!assets.has(key)) {
            assets.set(key, asset);
        }
    }

}

export { AssetsProvider, AssetsProviderEventType, AssetsProviderProgressEvent };
