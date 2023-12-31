import { MainUI } from "./main/MainUI.js";
import { HeaderUI } from "./header/HeaderUI.js";
import { ConnectedMainUI } from "./connectedmain/ConnectedMainUI.js";
import { Notifications } from "./notifications/Notifications.js";

export class PlatformUI {

    constructor(platform) {
        this._notifications = new Notifications();
    }

    get main() {
        return this._mainUI;
    }

    get header() {
        return this._headerUI;
    }

    get title() {
        return document.querySelector("title").textContent;
    }

    set title(title) {
        document.querySelector("title").textContent = title?title + " | Microportal":"Microportal";
    }

    get notifications() {
        return this._notifications;
    }

    load(platform) {
        this._mainUI = new MainUI(platform);
        this._headerUI = new HeaderUI(platform);
    }

    loadPlatform(platform) {
        this.main.load(platform);
        this.header.load(platform);

        platform.context.world.addEventListener("userChanged", () => {
            this._mainUI = new ConnectedMainUI(platform);
        });

        platform.serverConnection.addEventListener("close", () => { 
            this._mainUI = new MainUI(platform);
        });
    }

    reset(platform) {
        this._mainUI = new MainUI(platform);
        this._headerUI.reset();
    }

}
