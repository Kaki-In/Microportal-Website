import { MainComponent } from "../../../components/Main.js";
import { appendChild } from "../../../components/Component.js";
import { Loader } from "../../../components/Loader.js";
import { Adapter } from "../../../components/Adapter.js";

import { WelcomePage } from "./WelcomePage.js";

export class ConnectedMainUI extends MainComponent {
    
    constructor(platform) {
        super(new Adapter());

        this.adapter.content = new WelcomePage(platform);
    }

    openHome(platform) {
        this.adapter.content = new WelcomePage(platform);
    }

}
