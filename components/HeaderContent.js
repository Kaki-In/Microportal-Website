import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";

export class HeaderContent extends Component {

    constructor() {
        let div = createHeaderContent();

        super(div);

        this._logo = div.querySelector("img");
        this._list = div.querySelector("ul");

    }

    setLogo(name, func) {
        this._logo.src = "./static/images/" + name;
        this._logo.addEventListener("click", func);
    }

    addButton(name, func) {
        let button = new Button(name);
        button.className = "header-button"
        button.addEventListener("click", func);

        appendChild(this._list, button);

        return button;
    }

    addSpace() {
        let space = document.createElement("span");
        this._list.appendChild(space);

        return space;
    }

    addComponent(component) {
        appendChild(this._list, component);
    }

    addElement(element) {
        this._list.appendChild(element);
    }

}

function createHeaderContent() {
    let div = document.createElement("div");

    let logo = document.createElement("img");
    div.appendChild(logo);

    let list = document.createElement("ul");
    list.className = "header-list";
    div.appendChild(list);

    return div;
}
