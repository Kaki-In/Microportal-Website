import { appendChild } from "./Component.js";
import { Adapter } from "./Adapter.js";
import { Loader } from "./Loader.js";
import { Image } from "./Image.js";

export class Button extends Adapter {

    constructor(text) {
        let button = createButton(text);
        super();

        this._button = button;
        this.element = button;
        this._loading = false;
        this._className = "";
        this._icon = button.querySelector("img").component;

        this._loader = button.querySelector("div.loading");
    }

    get icon() {
        return this._icon;
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
            this._loader.classList.remove("hidden");
        } else {
            this._loader.classList.add("hidden");
        }
    }    
    
    set className(name) {
        this._className = name;
        this.element.className = name;
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
    appendChild(button, new Loader()).element.classList.add("hidden");
    appendChild(button, new Image());
    button.appendChild(document.createElement("text")).textContent = text;
    return button;
}

