import { EventHandler } from "../../../../events/EventHandler.js";
import { UserIcon } from "./icon/UserIcon.js";

export class User {

    constructor(name, icon, connected) {
        this._name = name;
        this._icon = new UserIcon(icon);
        this._connected = connected;

        this._events = {
            iconChanged: new EventHandler(),
            connectionStatusChanged: new EventHandler(),
        }
    }

    get name() {
        return this._name;
    }

    get icon() {
        return this._icon;
    }

    get connected() {
        return this._connected;
    }

    set icon(icon) {
        this._icon = new UserIcon(icon);
        this._events.iconChanged.emit(this._icon);
    }

    set connected(status) {
        this._connected = status;
        this._events.connectionStatusChanged.emit(status);
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
