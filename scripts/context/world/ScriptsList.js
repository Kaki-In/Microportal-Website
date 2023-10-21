import { EventHandler } from "../../../events/EventHandler.js";
import { Script } from "./script/Script.js";

export class ScriptsList {

    constructor() {
        this._scripts = [];

        this._events = {
            "add": new EventHandler(),
            "update" : new EventHandler(),
            "remove": new EventHandler()
        }
    }

    updateScripts(scripts) {
        for (let script of scripts) {
            this.updateScript(script);
        }

        for (let script of this._scripts) {
            if (!scripts[ script.id ]) {
                let deletedScript = script;
                delete this._users[ user.name ];
                this._events.remove.emit( deletedUser );
            }
        }
    }

    get userNames () {
        return Object.keys(this._users);
    }

    updateUser(name, usericon, last_connection) {
        let lastUser = this._users[ name ];
        if (lastUser) {
            lastUser.icon = usericon;
            this._events.update.emit(lastUser);
        } else {
            let newUser = new User(name, usericon);
            this._users[ name ] = newUser;
            this._events.add.emit(newUser);
        }
    }

    getUserByName(name) {
        return this._users [ name ];
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

