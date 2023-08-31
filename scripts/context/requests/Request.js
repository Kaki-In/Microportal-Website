import { EventHandler } from "../../../events/EventHandler.js";

export class Request {

    constructor(name, args) {
        this._state = "initializing";
        this._id = null;
        this._name = name;
        this._args = args;
        this._result = null;

        this._resultPromise = new Promise((resolve, reject) => {
            this._resultResolve = resolve;
        });

        this._events = {
            saved: new EventHandler(),
            sent: new EventHandler(),
        }

        this._processed = new EventHandler();
    }

    get state() {
        return this._state;
    }

    set state(state) {
        if (this._id === null) {
            throw TypeError("this request is still initializing");
        } else {
            let event = this._events[ state ];
            if (event === undefined) {
                throw new ReferenceError("unknown state");
            } else {
                this._state = state;
                event.emit();
            }
        }
    }

    set result(result) {
        if (this.state === "sent") {
            this._state = "processed";
            this._result = result;
            this._processed.emit();
            this._resultResolve(result);
        } else {
            throw new TypeError("this request has not been sent yet");
        }
    }

    get id() {
        return this._id;
    }

    set id(id) {
        if (this._id === null) {
            this._id = id;
            this._state = "waiting";
        } else {
            throw new TypeError("this request already have an id");
        }
    }

    get name() {
        return this._name;
    }

    get args() {
        return this._args;
    }

    get resultPromise() {
        return this._resultPromise;
    }

    addEventListener( name, func ) {
        if (name === "processed") {
            event = this._processed;
        } else {
            let event = this._events[ name ];
        }
        if ( event === undefined ) {
            throw new KeyError( "no such event" );
        } else {
            this._events[ name ].connect( func );
        }
    }

}
