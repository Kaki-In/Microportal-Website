import { PlatformUI } from "./ui/PlatformUI.js";
import { ServerConnection } from "./ServerConnection.js";
import { LocalActions } from "./localActions/LocalActions.js";
import { DistantActionsList } from "./distantActions/DistantActionsList.js";

export class Platform {

    constructor() {
        this._ui = new PlatformUI();
        this._distantActions = new DistantActionsList();
        this._localActions = new LocalActions(this);
        this.loadConnection();
    }

    loadConnection( event, wait ) {
        this._conn = new ServerConnection("kaki-v01", 8266);
        this._conn.addEventListener("open", () => { this.load(); })
        this._conn.addEventListener("close", (event) => { this.loadConnection(event, true) })

        setTimeout(() => { this._conn.start();}, wait? 5000 : 0);
    }
    
    get ui() {
        return this._ui;
    }
    
    get serverConnection() {
        return this._conn;
    }

    get localActions() {
        return this._localActions;
    }

    load(event) {
        this._ui.loadPlatform(this);
        this._distantActions.loadPlatform(this);
    }

}
