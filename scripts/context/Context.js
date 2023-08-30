import { World } from "./world/World.js";

export class Context {

    constructor() {
        this._world = null;
    }

    get world() {
        return this._world;
    }

    get connected() {
        return this.world.user !== null;
    }

}

