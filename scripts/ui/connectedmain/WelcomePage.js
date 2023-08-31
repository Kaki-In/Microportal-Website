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

    }

    async openPortal(platform) {
        
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