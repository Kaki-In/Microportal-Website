import { Component, appendChild } from "../../../components/Component.js";
import { Button } from "../../../components/Button.js";

export class WelcomePage extends Component{

    constructor (platform) {
        let element = createWelcome();

        super(element);
        let user = platform.context.world.users.getUserByName(platform.context.world.username);

        let button = element.querySelector("button").component;
        button.addEventListener("click", () => {
            this.openPortal(platform);
        })
        this._button = button;

        platform.ui.title = user.name;
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
        try {
            await Promise.all([request1, request2, request3]);
        } catch {
            this._button.disable();
        }
        this._button.loading = false;
    }

}

function createWelcome() {
    let divMain = document.createElement("div");
    divMain.classList.add("main-div");

    let div = divMain.appendChild(document.createElement("div"));

    div.appendChild(document.createElement("h1")).textContent = "Bienvenue dans le projet Microportal!";
    div.appendChild(document.createElement("p")).textContent = "Le site est actuellement en cours de création";
    div.appendChild(document.createElement("p")).textContent = "Vous êtes à présent connecté!";

    appendChild(div, new Button("Ouvrir le portail"));
    return divMain;
}
