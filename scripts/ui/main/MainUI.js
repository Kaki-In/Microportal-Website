import { MainComponent } from "../../../components/Main.js";
import { appendChild } from "../../../components/Component.js";
import { Loader } from "../../../components/Loader.js";
import { Adapter } from "../../../components/Adapter.js";

import { WelcomePage } from "./WelcomePage.js";
import { CreationPage } from "./CreationPage.js";
import { ServerSettingsPage } from "./ServerSettingsPage.js";
import { ConnectionPage } from "./ConnectionPage.js";
import { MailVerificationPage } from "./MailVerificationPage.js";

export class MainUI extends MainComponent {
    
    constructor(platform) {
        super(new Adapter());

        let loader = new ServerSettingsPage(platform);
        this.adapter.content = loader;
    }

    load(platform) {
        this.adapter.content = new WelcomePage(platform);
        platform.serverConnection.addEventListener("close", () => { this.reset(); })
    }

    openHome(platform) {
        this.adapter.content = new WelcomePage(platform);
    }

    openCreationPage(platform) {
        this.adapter.content = new CreationPage(platform);
    }

    openConnectionPage(platform) {
        this.adapter.content = new ConnectionPage(platform);
    }
    
    openMailVerificationPage(platform, name, password) {
        this.adapter.content = new MailVerificationPage(platform, name, password);
    }

}
