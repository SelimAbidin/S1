import { utils, Loader, LoaderResource } from 'pixi.js'
let EventEmitter = utils.EventEmitter;
import { AssetsProviderEventType, AssetsProviderProgressEvent, AssetsProviderStatusEvent, AssetsProviderStatus } from './events/AssetsProviderEvent'


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

    onStart = (loader: Loader, resource: LoaderResource) => {
        console.log("onStart");
        const event: AssetsProviderStatusEvent = {
            status: AssetsProviderStatus.START
        }
        this.emit(AssetsProviderEventType.START, event);
    }

    onComplete = (loader: Loader, resource: LoaderResource) => {
        console.log("COMPLETE");
        const event: AssetsProviderStatusEvent = {
            status: AssetsProviderStatus.COMPLETE
        }
        this.emit(AssetsProviderEventType.COMPLETE, event);
    }

    onError = (loader: Loader, resource: LoaderResource) => {
        console.log("onError");
        this.emit(AssetsProviderEventType.ERROR);
    }

    onProgress = (loader: Loader, resource: LoaderResource) => {
        console.log("onProgress");
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

    getAsset(key: string): any | never {
        let assets = this.assets;
        if (assets.has(key)) {
            return assets.get(key)
        }
        throw new Error(`"${key}" not found!`);
    }

}

export { AssetsProvider }