module app {
    export interface ICancellable<T> {
        cancel: () => void;
        promise: ng.IPromise<T>;
    }
}