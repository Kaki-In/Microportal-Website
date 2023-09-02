import { EventHandler } from "../../../events/EventHandler.js";
import { Request } from "./Request.js";

export class RequestsList {

    constructor() {
        this._requests = [];
        this._waitingRequests = [];

        this._events = {
            requestSaved : new EventHandler(),
        }
    }

    findRequestById(id) {
        for (let request of this._requests) {
            if ( request.id === id ) {
                return request;
            }
        }
        console.warn("no request found...");
    }

    create(name, args) {
        let request = new Request(name, args);
        this._waitingRequests.push(request);
        request.addEventListener("saved", () => {
            this._requests.push(request);
            this._events.requestSaved.emit(request);
        })
        return request;
    }

    addEventListener( name, func ) {
        let event = this._events[ name ];
        if ( event === undefined ) {
            throw new KeyError( "no such event" );
        } else {
            this._events[ name ].connect( func );
        }
    }

    registerRequestId(id) {
        let request = this._waitingRequests.shift();
        if (request === undefined) {
            throw new ReferenceError("there is not waiting request");
        } else {
            request.id = id;
        }
    }

    registerRequestError() {
        let request = this._waitingRequests.shift();
        request.cancel();
    }

}
