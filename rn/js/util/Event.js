
export class Event {
    constructor() {
        this.callbacks = {};
        this.counter = 0;
        this.sub = (arg1, arg2) => this.subscribe(arg1, arg2);
        this.unsub = (arg) => this.unsubscribe(arg);
        this.qsub = (arg1, arg2) => this.quickSubscribe(arg1, arg2);
        this.qunsub = (arg) => this.quickUnsubscribe(arg);
    }
    
    quickSubscribe(keyObj, callback) {
        return this.subscribe(keyObj.constructor.name, callback);
    }

    quickUnsubscribe(keyObj) {
        return this.unsubscribe({ key: keyObj.constructor.name });
    }
    
    subscribe(callbackOrKey, maybeCallback) {

        const callback = maybeCallback || callbackOrKey;
        let key = callbackOrKey;

        if (!maybeCallback) {
            key = this.counter;
            this.counter += 1;
        }

        this.callbacks[key] = callback;
        return { key, callback };
    }

    unsubscribe(sub) {
        delete this.callbacks[sub.key];
    }

    raise() {
        const args = arguments;
        Object.keys(this.callbacks).forEach(key => this.callbacks[key].apply(null, args));
    }
}