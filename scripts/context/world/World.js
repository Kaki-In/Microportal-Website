export class World {

    constructor() {
        this._user = null;
    }

    get user() {
        return this._user;
    }

    setUser(name, icon) {
        this._user = new User(name, icon);
    }

}