import { EventHandler } from "../../../events/EventHandler.js";
import { User } from "./user/User.js";

export class UsersList {

    constructor() {
        this._users = {};

        this._events = {
            "add": new EventHandler(),
            "update" : new EventHandler(),
            "remove": new EventHandler()
        }
    }

    updateUsers(users) {
        for (let user of users) {
            this.updateUser(user.name, user.icon, user.last_connection);
        }

        for (let oldusername of Object.keys(this._users)) {
            let userFound = false;
            for (let user of users)
            {
                if (user.name === oldusername)
                {
                    userFound = true;
                }
            };
            if (!userFound) {
                let deletedUser = this._users[ oldusername];
                delete this._users[ oldusername ];
                this._events.remove.emit( deletedUser );
            };
        };
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

