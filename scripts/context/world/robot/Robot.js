import { EventHandler } from "../../../../events/EventHandler.js";

export class Robot {

    constructor(mac, name, type, last_connection) {
        this._mac = mac;
        this._name = name;
        this._type = type;
        this._lastConn = last_connection;

        this._events = {
            nameChanged: new EventHandler(),
            typeChanged: new EventHandler(),
            lastConnectionChanged: new EventHandler()
        }
    }

    get mac() {
        return this._mac;
    }

    get name() {
        return this._name;
    }

    get type() {
        return this._type;
    }

    get last_connection() {
        return this._lastConn;
    }

    set name(name) {
        this._name = name;
        this._events.nameChanged.emit(this._name);
    }

    set type(type) {
        this._type = type;
        this._events.typeChanged.emit(this._type);
    }

    set last_connection(last_connection) {
        this._lastConn = last_connection;
        this._events.lastConnectionChanged.emit(this._lastConn);
    }

    addEventListener(name, func) {
        let event = this._events[ name ];
        if ( event === undefined ) {
            throw new ReferenceError( "no such event" );
        } else {
            event.connect( func );
        }
    }

}
