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
                console.log(request);
                return request;
            }
        }
        console.warn("no request found...");
    }

    create(name, args) {
        console.log("create");
        console.log(this);
        let request = new Request(name, args);
        this._waitingRequests.push(request);
        request.addEventListener("saved", () => {
            this._requests.push(request);
            this._events.requestSaved.emit(request);
        })
        console.log(this);
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
