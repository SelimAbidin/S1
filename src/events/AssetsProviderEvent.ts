
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


export { AssetsProviderProgressEvent, AssetsProviderEventType, AssetsProviderStatusEvent, AssetsProviderStatus }