import { EventHandler } from "../../../events/EventHandler.js";
import { User } from "./user/User.js";

export class World {

    constructor() {
        this._user = null;

        this._events = {
            userChanged : new EventHandler()
        }
    }

    get user() {
        return this._user;
    }

    setUser(name, icon) {
        this._user = new User(name, icon);
        this._events.userChanged.emit(this._user);
    }

    addEventListener(name, func) {
        let event = this._events[ name ];
        if ( event === undefined ) {
            throw new KeyError( "no such error" );
        } else {
            event.connect( func );
        }
    }

}