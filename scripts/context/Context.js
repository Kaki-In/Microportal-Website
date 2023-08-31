import { World } from "./world/World.js";
import { RequestsList } from "./requests/RequestsList.js";

export class Context {

    constructor() {
        this._world = new World();
        this._requests = new RequestsList();
    }

    get world() {
        return this._world;
    }

    get requestsList() {
        return this._requests;
    }

    get connected() {
        return this.world.user !== null;
    }

}

