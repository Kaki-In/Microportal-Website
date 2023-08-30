import { MainUI } from "./main/MainUI.js";
import { HeaderUI } from "./header/HeaderUI.js";

export class PlatformUI {

    constructor() {

        this._mainUI = new MainUI();
        this._headerUI = new HeaderUI();

    }

    get main() {
        return this._mainUI;
    }

    get header() {
        return this._headerUI;
    }

    loadPlatform(platform) {
        this.main.load(platform);
        this.header.load(platform);
    }

    reset() {
        this._mainUI.reset();
        this._headerUI.reset();
    }

}
