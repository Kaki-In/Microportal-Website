export class EventHandler {

    constructor() {
        this._funcs = [];
    }

    connect(func) {
        this._funcs.push(func);
    }

    disconnect(func) {
        let index = this._funcs.indexOf(func);

        if (index == -1) {
            throw new ReferenceError("function not connected to the event");
        } else {
            this._funcs.splice(index, 1)
        }
    }

    emit(...args) {
        for ( let func of this._funcs ) {
            ( async () => { func(...args) } ) ();
        }
    }

}