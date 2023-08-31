import { EventHandler } from "../events/EventHandler.js";

export class ServerConnection {

    constructor(server, port) {
        this._server = server;
        this._port = port;
        this._conn = null;
        
        this._events = {
            "open": new EventHandler(),
            "message": new EventHandler(),
            "error": new EventHandler(),
            "close": new EventHandler()
        };
    }

    async start() {
        let wsock = new WebSocket("ws://" + this._server + ":" + this._port + "/user");

        wsock.addEventListener("open", () => {
            console.log("Websocket: Connection open");
            this._open();
        });

        wsock.addEventListener("message", (event) => {
            console.log("Websocket: Message received", event);
            this._message(event);
        });

        wsock.addEventListener("error", (event) => {
            console.error("Websocket: An error occured", event);
            this._error(event);
        });

        wsock.addEventListener("close", (event) => {
            console.log("Websocket: Connection closed", event);
            this._close(event);
        });
        this._conn = wsock;
    }
    
    addEventListener( name, func ) {
        let event = this._events[ name ];
        if ( event === undefined ) {
            throw new KeyError( "no such event" );
        } else {
            this._events[ name ].connect( func );
        }
    }

    async _open() {
        this._events[ "open" ].emit();
    }

    async _message(event) {
        let data = event.data;
        this._events[ "message" ].emit(JSON.parse(data));
    }

    async _error(event) {
        this._events[ "error" ].emit(event);
    }

    async _close(event) {
        this._events[ "close" ].emit(event);
    }

    close() {
        this._conn.close();
    }


    createRequest(name, args) {
        return {
            "name": name, 
            "args": args
        }
    }

    async send(object) {
        await this._conn.send(JSON.stringify(object));
    }

}
