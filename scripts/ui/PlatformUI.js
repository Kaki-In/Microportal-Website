import { MainUI } from "./main/MainUI.js";
import { HeaderUI } from "./header/HeaderUI.js";
import { ConnectedMainUI } from "./connectedmain/ConnectedMainUI.js";
import { Notifications } from "./notifications/Notifications.js";

export class PlatformUI {

    constructor() {

        this._mainUI = new MainUI();
        this._headerUI = new HeaderUI();
        this._notifications = new Notifications();

    }

    get main() {
        return this._mainUI;
    }

    get header() {
        return this._headerUI;
    }

    get notifications() {
        return this._notifications;
    }

    loadPlatform(platform) {
        this.main.load(platform);
        this.header.load(platform);

        platform.context.world.addEventListener("userChanged", () => {
            this._mainUI = new ConnectedMainUI();
        })
    }

    reset() {
        this._mainUI = new MainUI();
        this._headerUI.reset();
    }

}
