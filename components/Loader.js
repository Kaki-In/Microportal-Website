import { Component } from "./Component.js";

export class Loader extends Component {

    constructor() {

        super(createDiv());

    }

}

function createDiv() {
    let div = document.createElement("div");
    div.className = "loading";
    for (let i=0; i < 8; i++) {
        div.appendChild(document.createElement("div")).appendChild(document.createElement("span"));
    }
    return div;
}

