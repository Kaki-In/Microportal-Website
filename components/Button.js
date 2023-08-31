import { appendChild } from "./Component.js";
import { Adapter } from "./Adapter.js";
import { Loader } from "./Loader.js";

export class Button extends Adapter {

    constructor(text) {
        super();
        let button = createButton(text);
        this._button = button;
        this.element = button;

        this._loading = false;
        this._className = "";
        this._icon = null;
    }

    set icon(src) {
        this.element.children[ 0 ].src = src;
        if (src) {
            this.element.children[ 0 ].className = "active";
        } else {
            this.element.children[ 0 ].className = "";
        }
    }

    get icon() {
        return this.element.children[ 0 ].src;
    }

    set text(text) {
        this.element.children[ 1 ].textContent = text;
    }

    get text() {
        return this.element.children[ 1 ].textContent;
    }

    set loading(value) {
        this._loading = value;
        if (this._loading) {
            this.content = new Loader();
            this.element.classList.add("centered");
        } else {
            this.element = this._button;
        }
    }    
    
    set className(name) {
        this._className = name;
        if (!this.loading) {
            this.element.className = name;
        }
    }

    addEventListener(name, func) {
        this._button.addEventListener(name, func);
    }

    enable() {
        this._button.disabled = false;
    }

    disable() {
        this._button.disabled = true;
    }

}

function createButton(text, listener) {
    let button = document.createElement('button');
    button.addEventListener("click", listener);
    button.appendChild(document.createElement("img"));
    button.appendChild(document.createElement("text")).textContent = text;
    return button;
}

