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
    div.classList.add("main-div");

    let divContent = div.appendChild(document.createElement("div"));

    divContent.appendChild(document.createElement("h1")).textContent = "Bienvenue dans le projet Microportal!";
    divContent.appendChild(document.createElement("p")).textContent = "Le site est actuellement en cours de création";

    return div
}