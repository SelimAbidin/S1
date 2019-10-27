import { utils, Loader, LoaderResource } from 'pixi.js'
let EventEmitter = utils.EventEmitter;

enum AssetsProviderEventType {
    COMPLETE = 'onComplete',
    START = 'onStart',
    PROGRESS = 'onProgress',
    ERROR = 'onError'
}

type AssetsProviderProgressEvent = {
    progress: number,
    min: number,
    max: number,
}

enum AssetsProviderStatus {
    START = 'START',
    COMPLETE = 'COMPLETE',
}

type AssetsProviderStatusEvent = {
    status: AssetsProviderStatus
}



class AssetsProvider extends EventEmitter {
    private assets: Map<string, any> = new Map<string, any>();
    private loader: Loader;
    constructor(loader: Loader) {
        super();
        this.loader = loader;
        loader.onStart.add(this.onStart)
        loader.onComplete.add(this.onComplete)
        loader.onError.add(this.onError)
        loader.onProgress.add(this.onProgress)
    }

    load() {
        this.loader.load();
    }

    playSound(key: string) {
        this.loader.resources[key].sound.play()
    }

    onStart = (_loader: Loader, _resource: LoaderResource) => {

        const event: AssetsProviderStatusEvent = {
            status: AssetsProviderStatus.START
        }
        this.emit(AssetsProviderEventType.START, event);
    }

    onComplete = (_loader: Loader, _resource: LoaderResource) => {
        console.log(_resource);

        const event: AssetsProviderStatusEvent = {
            status: AssetsProviderStatus.COMPLETE
        }
        this.emit(AssetsProviderEventType.COMPLETE, event);
    }

    onError = (_loader: Loader, _resource: LoaderResource) => {
        this.emit(AssetsProviderEventType.ERROR);
    }

    onProgress = (loader: Loader, _resource: LoaderResource) => {
        const event: AssetsProviderProgressEvent = {
            progress: loader.progress,
            max: 100,
            min: 0
        }
        this.emit(AssetsProviderEventType.PROGRESS, event);
    }

    loadTexture(key: string, path: string) {
        const loader = this.loader;
        loader.add(key, path)
    }

    loadSound(key: string, path: string) {
        const loader = this.loader;
        loader.add(key, path)
    }

    loadAnimJSON(path: string) {
        const loader = this.loader;
        loader.add(path)
    }

    addAsset(key: string, asset: any): void {
        let assets = this.assets
        if (!assets.has(key)) {
            assets.set(key, asset);
        }
    }

}

export { AssetsProvider, AssetsProviderEventType, AssetsProviderProgressEvent }