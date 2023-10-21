import { Component, appendChild } from "../../../components/Component.js";
import { Button } from "../../../components/Button.js";
import { Image } from "../../../components/Image.js";
import { Menu } from "../../../components/Menu.js";

export class UserPage extends Component {

    constructor (platform) {
        let element = createUser();

        super(element);

        let user = platform.context.world.users.getUserByName(platform.context.world.username);

        this._menu = element.children[ 0 ].component;
        let div = this._menu.addIconText(user.name);
        div.querySelector("img").classList.add("user-icon");
        div.querySelector("img").component.base64 = user.icon.data;
        this._menu.addOption("Se déconnecter", () => {
            platform.context.shelve.username = undefined;
            platform.context.shelve.password = undefined;
            platform.serverConnection.close();
        })

        platform.ui.title = "Paramètres de l'utilisateur";
    }

}

function createUser() {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let menu = new Menu("Paramètres de l'utilisateur");

    appendChild(centraldiv, menu);
    return centraldiv;
}