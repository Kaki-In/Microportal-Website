import { PlatformUI } from "./ui/PlatformUI.js";
import { ServerConnection } from "./ServerConnection.js";
import { LocalActions } from "./localActions/LocalActions.js";
import { ConnectedLocalActions } from "./localActions/ConnectedLocalActions.js";
import { DistantActionsList } from "./distantActions/DistantActionsList.js";
import { ConnectedDistantActionsList } from "./distantActions/ConnectedDistantActionsList.js";
import { Context } from "./context/Context.js";

export class Platform {

    constructor() {
        this._ui = new PlatformUI();
        this._distantActions = new DistantActionsList();
        this._localActions = new LocalActions(this);
        this._context = new Context();
        this.loadConnection();
    }

    loadConnection( event, wait ) {
        this._conn = new ServerConnection("kaki-v01", 8266);
        this._conn.addEventListener("open", () => { this.load(); })
        this._conn.addEventListener("close", (event) => { 
            let wait = true;
            this.loadConnection(event, true);
        });

        setTimeout(() => { this._conn.start();}, wait? 5000 : 0);
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

    get context() {
        return this._context;
    }

    load(event) {
        this._context = new Context();
        this._context.world.addEventListener("userChanged", async (user) => {
            this._distantActions = new ConnectedDistantActionsList();
            this._localActions = new ConnectedLocalActions(this);
            let informations = await this._localActions.fetchUser(user.name);
            if (informations.state === "success") {
                this.context.world.user.icon = informations.result.icon;
            } else {
                console.error("fetch failed");
            }
        })
        this._ui.loadPlatform(this);

        this._conn.addEventListener("message", (message) => {
            this._distantActions.execute(platform, message);
        })
    }

}
