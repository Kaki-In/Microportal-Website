import { appendChild, Component } from "../../../../components/Component.js";
import { Form } from "../../../../components/Form.js";

export class ServerCreationPage extends Form {

    constructor (adapter, platform) {
        super("Se connecter à un serveur microportal");

        let servers = platform.context.shelve.knownServers || [];
        if ( servers.length ) {
            this.addAlternative("", "Se connecter à un serveur déjà connu", () => {
                adapter.openKnowns(platform);
            });
        }

        this.addInput("Adresse du serveur:", "text", true);

        this.button.element.textContent = "Se connecter";
    }

}
