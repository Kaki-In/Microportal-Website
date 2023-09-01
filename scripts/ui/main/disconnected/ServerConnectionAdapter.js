import { Adapter } from "../../../../components/Adapter.js";
import { ServerCreationPage } from "./ServerCreation.js";
import { ServersMenu } from "./ServersMenu.js";

export class ServerConnectionAdapter extends Adapter {

    constructor (platform) {
        super();

        this.update(platform);
    }

    update(platform) {
        let knownServers = platform.context.shelve.knownServers || [];

        if ( knownServers.length === 0 ) {
            this.openCreation(platform);
        } else {
            this.openKnowns(platform);
        }
    }

    openCreation(platform) {
        this.content = new ServerCreationPage(this, platform);
        this.content.addEventListener("submit", (serverName) => {
            this.content.loading = true;
            let knownServers = platform.context.shelve.knownServers || [];
            knownServers.push({
                name: serverName, 
                port: 8266
            });
            platform.context.shelve.knownServers = knownServers;
            platform.loadConnection(serverName, 8266);
        });
    }

    openKnowns(platform) {
        this.content = new ServersMenu(this, platform);
    }

}
