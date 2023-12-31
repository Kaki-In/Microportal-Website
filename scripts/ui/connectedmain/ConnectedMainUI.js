import { MainComponent } from "../../../components/Main.js";
import { appendChild } from "../../../components/Component.js";
import { Loader } from "../../../components/Loader.js";
import { Adapter } from "../../../components/Adapter.js";

import { WelcomePage } from "./WelcomePage.js";
import { UserPage } from "./UserSettingsPage.js";
import { CommunityPage } from "./CommunityPage.js";
import { RobotsPage } from "./RobotsPage.js";

export class ConnectedMainUI extends MainComponent {
    
    constructor(platform) {
        super(new Adapter());

        this.adapter.content = new WelcomePage(platform);
        this._page = "home";
    }

    get page() {
        return this._page;
    }

    openHome(platform) {
        this._page = "home";
        this.adapter.content = new WelcomePage(platform);
    }

    openUserSettings(platform) {
        this._page = "settings";
        this.adapter.content = new UserPage(platform);
    }

    openCommunityPage(platform) {
        this._page = "community";
        this.adapter.content = new CommunityPage(platform);
    }

    openRobotsPage(platform) {
        this._page = "robots";
        this.adapter.content = new RobotsPage(platform);
    }

}
