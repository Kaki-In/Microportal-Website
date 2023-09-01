import { Component, appendChild } from "../../../components/Component.js";
import { Button } from "../../../components/Button.js";

export class WelcomePage extends Component{

    constructor (platform) {
        let element = createWelcome();

        super(element);

        let button = element.children[ 3 ].component;
        button.addEventListener("click", () => {
            this.openPortal(platform);
        })
        this._button = button;

        platform.ui.title = platform.context.world.user.name;
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

function createWelcome() {
    let div = document.createElement("div");

    div.appendChild(document.createElement("h1")).textContent = "Bienvenue dans le projet Microportal!";
    div.appendChild(document.createElement("p")).textContent = "Le site est actuellement en cours de création";
    div.appendChild(document.createElement("p")).textContent = "Vous êtes à présent connecté!";

    appendChild(div, new Button("Ouvrir le portail"));
    return div
}