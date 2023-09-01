import { HeaderContent } from "../../../components/HeaderContent.js";

export class HeaderDefault  extends HeaderContent {

    constructor (platform) {
        super();

        this.setLogo("icon192x192.png", () => {
            platform.serverConnection.close();
        });
        this.addSpace();
        this.addButton("Se connecter", () => {
            platform.ui.main.openConnectionPage(platform);
        });
        this.addButton("Créer un compte", () => {
            platform.ui.main.openCreationPage(platform);
        });
        this.addSpace();
    }

}
