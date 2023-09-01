import { Component, appendChild } from "../../../components/Component.js";
import { Button } from "../../../components/Button.js";
import { Menu } from "../../../components/Menu.js";

export class UserPage extends Component {

    constructor (platform) {
        let element = createUser();

        super(element);

        this._menu = element.children[ 0 ].component;
        this._menu.addOption("Se déconnecter", () => {
            platform.context.shelve.username = undefined;
            platform.context.shelve.password = undefined;
            platform.serverConnection.close();
        })

    }

    async openPortal(platform) {
        const robotName = "84:0d:8e:b0:67:e4";
        this._button.loading = true;

        let request1 = platform.localActions.sendRobotAction(robotName, "setPin", {
            pin: 4,
            active: true
        });
        let request2 = platform.localActions.sendRobotAction(robotName, "sleep", {
            time: 0.05
        });
        let request3 = platform.localActions.sendRobotAction(robotName, "setPin", {
            pin: 4,
            active: false
        });
        await Promise.all([request1, request2, request3]);
        this._button.loading = false;
    }

}

function createUser() {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let menu = new Menu("Paramètres de l'utilisateur");

    appendChild(centraldiv, menu);
    return centraldiv;
}