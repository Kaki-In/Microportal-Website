import { Component } from "../../../components/Component.js";

export class WelcomePage extends Component{

    constructor (platform) {
        let element = createWelcome();

        super(element);

        this.loadPlatform(platform);

        platform.ui.title = undefined;
    }

    loadPlatform(platform) {
    }

}

function createWelcome() {
    let div = document.createElement("div");

    div.appendChild(document.createElement("h1")).textContent = "Bienvenue dans le projet Microportal!";

    div.appendChild(document.createElement("p")).textContent = "Le site est actuellement en cours de création";

    return div
}