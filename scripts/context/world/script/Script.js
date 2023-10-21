export class Script {
    constructor(id) {
        this._id = id;
        this._user = null;
        this._robot = null;
        this._name = "Script #" + id;
        this._action = "";
        this._args = {};
        this._published = False;
        this._id = id;
        this._creation = undefined;
        this._modified = undefined;
    }

    get id() {
        return this._id;
    }

    get user() {
        return this._user;
    }

    set user(user) {
        if (this._user && this._user !== user) {
            throw new ReferenceError("user already defined");
        }
        this._user = user;
    }

    get robot() {
        return this._robot;
    }

    set robot(robot) {
        this._robot = robot;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get action() {
        return this._action;
    }

    set action(action) {
        this._action = action;
    }

    get args() {
        return this._args;
    }

    set args(args) {
        this._args = args;
    }

    get published() {
        return this._published;
    }

    set published(published) {
        this._published = published;
    }

    get creation() {
        return this._creation;
    }

    set creation(time) {
        if (this._creation && this._creation !== time) {
            throw new ReferenceError("creation time already defined");
        }
        this._creation = time;
    }

    get modified() {
        return this._modified;
    }

    set modified(time) {
        this._modified = time;
    }

}