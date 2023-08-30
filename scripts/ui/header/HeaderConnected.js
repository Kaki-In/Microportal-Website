import { HeaderContent } from "../../../components/HeaderContent.js";

export class HeaderConnected  extends HeaderContent {

    constructor () {
        super();

        this.setLogo("icon192x192.png", () => {platform.ui.main.openHome()});
        this.addButton("Communauté");
        this.addButton("Robots enregistrés");
        this.addButton("État des pins");
        this.addSpace();
        this.addButton("Mode manuel");
    }

}
