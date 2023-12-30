import { Component, appendChild, removeChild } from "./Component.js";
import { Button } from "./Button.js";
import { HeaderBurger } from "./HeaderBurger.js";

export class HeaderContent extends Component {

    constructor() {
        let div = createHeaderContent();

        super(div);

        this._logo = div.querySelector("img");
        this._logo.addEventListener("click", () => {document.querySelector("header").classList.remove("open");});
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
        button.addEventListener("click", () => {document.querySelector("header").classList.remove("open");});

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

    let list = document.createElement("ul");
    list.className = "header-list";
    div.appendChild(list);

    let button = new Button("MENU");
    appendChild(list, button);
    button.element.children[ 1 ].replaceWith(new HeaderBurger().element);

    let logo = document.createElement("img");
    list.appendChild(logo);

    button.addEventListener("click", () => {
        document.querySelector("header").classList.toggle("open");
    });

    button.className = "open-menu";

    return div;
}
