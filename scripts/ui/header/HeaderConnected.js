import { HeaderContent } from "../../../components/HeaderContent.js";
import { Button } from "../../../components/Button.js";
import { appendChild } from "../../../components/Component.js";

export class HeaderConnected  extends HeaderContent {

    constructor (platform) {
        super();

        this.setLogo("icon192x192.png", () => {
            platform.serverConnection.close();
        });
        this.addSpace();
        this.addButton("Communauté");
        this.addButton("Robots enregistrés");
        this.addButton("État des pins");
        this.addButton("Mode manuel");
        this.addSpace();
        this._userButton = this.addButton(platform.context.world.user.name);

        platform.context.world.user.addEventListener("iconChanged", (icon) => {
            this.updateUserIcon(icon);
        })
    }

    updateUserIcon(icon) {
        this._userButton.icon = "data:image/png;base64," + icon.data;
    }

}

