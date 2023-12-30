import { appendChild, Component } from "../../../../components/Component.js";
import { Menu } from "../../../../components/Menu.js";

export class ServersMenu extends Menu {

    constructor (adapter, platform) {
        super("Se connecter à un serveur microportal");

        let knownServers = platform.context.shelve.knownServers || {};

        this.addOption("Nouveau serveur", function() {
            adapter.openCreation(platform);
        });

        for ( let server of knownServers ) {
            this.addText(server.name);
            this.addOption("Se connecter", function() {
                platform.loadConnection(server.name, server.port)
            });
            this.addOption("Supprimer", function() {
                let index = knownServers.indexOf(server);
                knownServers.splice(index, 1);
                platform.context.shelve.knownServers = knownServers;
                adapter.update(platform);
            });
        };
        platform.ui.title = "Connexion au serveur";
    }

}
