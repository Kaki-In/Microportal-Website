import { HeaderContent } from "../../../components/HeaderContent.js";
import { Loader } from "../../../components/Loader.js";

export class HeaderLoading  extends HeaderContent {

    constructor () {
        super();

        let loader = new Loader();

        this.setLogo("icon192x192.png", () => {
            platform.serverConnection.close();
        });
    }

}
