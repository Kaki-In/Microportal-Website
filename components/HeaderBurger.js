import { Component } from "./Component.js";

export class HeaderBurger extends Component {

    constructor() {

        super(createDiv());

    }

}

function createDiv() {
    let div = document.createElement("div");
    div.className = "menu-burger";

    return div;
}

