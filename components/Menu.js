import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";

export class Menu extends Component {

    constructor(title) {
        let div = createMenu(title);
        super(div);
    }

    addOption(name, func) {
        let button = new Button(name);
        button.addEventListener("click", func);
        button.className = "list-button";
        appendChild(this.element, button);
        return button;
    }

    addText(text) {
        let paragraph = document.createElement("p");
        paragraph.textContent = text;
        this.element.appendChild(paragraph);
        return paragraph;
    }

    addSpace() {
        this.element.appendChild(document.createElement("div")).className = "spaceDiv";
    }

}

function createMenu(title) {
    let div = document.createElement("div");
    div.className = "list";

    div.appendChild(document.createElement("h1")).textContent = title;

    return div;
}

