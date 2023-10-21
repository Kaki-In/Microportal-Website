import { EventHandler } from "../../../../events/EventHandler.js";
import { UserIcon } from "./icon/UserIcon.js";

export class User {

    constructor(name, icon) {
        this._name = name;
        this._icon = new UserIcon(icon);

        this._events = {
            iconChanged: new EventHandler()
        }
    }

    get name() {
        return this._name;
    }

    get icon() {
        return this._icon;
    }

    set icon(icon) {
        this._icon = new UserIcon(icon);
        this._events.iconChanged.emit(this._icon);
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
