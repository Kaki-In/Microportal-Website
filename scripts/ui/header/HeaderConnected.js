import { HeaderContent } from "../../../components/HeaderContent.js";
import { Button } from "../../../components/Button.js";
import { appendChild } from "../../../components/Component.js";

export class HeaderConnected  extends HeaderContent {

    constructor (platform) {
        super();

        let user = platform.context.world.users.getUserByName(platform.context.world.username);

        this.setLogo("icon192x192.png", () => {
            if (platform.ui.main.page === "home") {
                platform.serverConnection.close();
            } else {
                platform.ui.main.openHome(platform);
            }
        });
        this.addSpace();
        this.addButton("Communauté").addEventListener("click", () => {
            platform.ui.main.openCommunityPage(platform);
        });
        this.addButton("Robots enregistrés");
        this.addButton("État des pins");
        this.addButton("Mode manuel");
        this.addSpace();
        this._userButton = this.addButton(user.name);
        this._userButton.icon.element.classList.add("user-icon");

        this.updateUserIcon(user.icon);
        user.addEventListener("iconChanged", (icon) => {
            this.updateUserIcon(icon);
        })
        this._userButton.addEventListener("click", () => {
            platform.ui.main.openUserSettings(platform);
        });
    }

    updateUserIcon(icon) {
        this._userButton.icon.base64 = icon.data;
    }

}

