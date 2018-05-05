module app {
    export class Arbiter<T> {
        private listeners: { [id:string]: Function[] };
        private target: T;

        constructor(target: T) {
            this.target = target;
            this.listeners = {};
        }

        public on = (event: string, callback: Function) => {
            this.listeners[event] = this.listeners[event] || [];
            this.listeners[event].push(callback);
        }

        public unsubscribe = (event: string, callback: Function) => {
            let callbacks = this.listeners[event];
            let index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }

        public broadcast = (event: string) => {
            let callbacks = this.listeners[event];
            if (callbacks) {
                callbacks.forEach(callback => {
                    let event = { target: this.target };
                    callback(event);
                });
            }
        }
    }
}