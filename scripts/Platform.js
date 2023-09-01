import { PlatformUI } from "./ui/PlatformUI.js";
import { ServerConnection } from "./ServerConnection.js";
import { LocalActions } from "./localActions/LocalActions.js";
import { ConnectedLocalActions } from "./localActions/ConnectedLocalActions.js";
import { DistantActionsList } from "./distantActions/DistantActionsList.js";
import { ConnectedDistantActionsList } from "./distantActions/ConnectedDistantActionsList.js";
import { Context } from "./context/Context.js";

export class Platform {

    constructor() {
        this._context = new Context();
        this._ui = new PlatformUI(this);
        let address = this.context.shelve.address;
        let port = this.context.shelve.port;
        if ( address !== undefined && port !== undefined ) {
            this.loadConnection(address, port);
        }
    }

    loadConnection( server, port ) {
        this._conn = new ServerConnection();
        this._conn.addEventListener("open", () => { this.load(); })

        this._conn.addEventListener("close", (event) => {
            if (! ( [1000, 1001].includes(event.code) || event.wasClean ) ) {
                let notification = this._ui.notifications.createNotification("error");
                notification.title = "Impossible de joindre le serveur";
                notification.text = "Une erreur s'est produite. Veuillez réessayer, ou indiquer un autre serveur.";
            }
        })

        this.context.shelve.address = server;
        this.context.shelve.port = port;

        this._ui.loadPlatform(this);

        this._conn.start(server, port);
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

    load() {
        this._context = new Context();
        this._distantActions = new DistantActionsList();
        this._localActions = new LocalActions(this);

        this._ui.loadPlatform(this);

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
        this._conn.addEventListener("message", (message) => {
            this._distantActions.execute(platform, message);
        })
    }

}

self.Platform = Platform
