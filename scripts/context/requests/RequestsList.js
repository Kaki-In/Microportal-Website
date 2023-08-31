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

    create(name, args) {
        let request = new Request(name, args);
        this._waitingRequests.push(request);
        request.addEventListener("saved", () => {
            this._requests.push(request);
            this._events.requestSent.emit(request);
        })
        this._waitingRequests.push(request);
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
        let request = this._waitingRequests[ 0 ];
        if (request === undefined) {
            throw new ReferenceError("there is not waiting request");
        } else {
            request.id = id;
            this._waitingRequests.slice(0, 1);
        }
    }

}
