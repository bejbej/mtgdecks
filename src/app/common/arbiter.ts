module app {
    export interface ISubscription {
        unsubscribe: () => void;
    }

    export interface IBroadcaster<T> {
        broadcast: (value?: T) => void;
    }

    export interface ISubscriber<T> {
        subscribe: (callBack: (value: T) => any) => ISubscription
    }

    export class Arbiter<T> implements ISubscriber<T>, IBroadcaster<T> {
        private listeners: Function[] = [];

        public subscribe = (callback: Function): ISubscription => {
            this.listeners.push(callback);
            return {
                unsubscribe: () => {
                    let index = this.listeners.indexOf(callback);
                    if (index > -1) {
                        this.listeners.splice(index, 1);
                    }
                }
            }
        }

        public broadcast = (value?: T) => {
            this.listeners.forEach(listener => {
                listener(value);
            });
        }
    }
}