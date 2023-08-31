import { World } from "./world/World.js";
import { RequestsList } from "./requests/RequestsList.js";
import { Shelve } from "./Shelve.js";

export class Context {

    constructor() {
        this._world = new World();
        this._requests = new RequestsList();
        this._shelve = new Shelve();
    }

    get world() {
        return this._world;
    }

    get requests() {
        return this._requests;
    }

    get shelve() {
        return this._shelve;
    }

    get connected() {
        return this.world.user !== null;
    }

}

