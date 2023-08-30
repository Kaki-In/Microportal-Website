import { removeChild, appendChild, Component } from "../../../components/Component.js";
import { Button } from "../../../components/Button.js";

export class Notification extends Component {

    constructor(state) {
        let element = createNotification(state, "", "");
        super(element);
        this._element = element;
        let button = element.querySelector("button.close-notification-button");
        button.addEventListener("click", () => {this.destroy();})
    }

    get title () {
        return this._element.querySelector("h3").textContent;
    }

    set title(title) {
        return this._element.querySelector("h3").textContent = title;
    }

    get texg () {
        return this._element.querySelector("p").textContent;
    }

    set text(text) {
        return this._element.querySelector("p").textContent = text;
    }

    addAction(name, func) {
        let button = new Button(name);
        let blist = this._element.querySelector(".options-notifications-div");
        appendChild(blist, button);
        button.addEventListener("click", func);
        return button;
    }

    hide() {
        this.element = document.createComment("hidden notification");
    }

    show() {
        this.element = this._element;
    }

    destroy() {
        removeChild(this.parent, this);
    }

}

function createNotification(state, title, text) {

    let div = document.createElement("div");
    div.className = state;
    let button = div.appendChild(document.createElement("button"));
    button.className = "close-notification-button";
    div.appendChild(document.createElement("h3")).textContent = title;
    div.appendChild(document.createElement("p")).textContent = text;
    div.appendChild(document.createElement("div")).className = "options-notifications-div";

    return div;

}

