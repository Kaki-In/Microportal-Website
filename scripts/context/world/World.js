import { EventHandler } from "../../../events/EventHandler.js";
import { User } from "./user/User.js";
import { UsersList } from "./UsersList.js";
import { ScriptsList } from "./ScriptsList.js";
import { RobotsList } from "./RobotsList.js";

export class World {

    constructor() {
        this._user = null;
        this._users = new UsersList();
        this._scripts = new ScriptsList();
        this._robots = new RobotsList();

        this._events = {
            userChanged : new EventHandler()
        }
    }

    get username() {
        return this._user;
    }

    get users() {
        return this._users;
    }

    get robots() {
        return this._robots;
    }

    get scripts() {
        return this._scripts;
    }

    set username(name) {
        this._user = name;
        this._events.userChanged.emit(name);
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