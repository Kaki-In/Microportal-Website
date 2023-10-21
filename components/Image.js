import { appendChild } from "./Component.js";
import { Component } from "./Component.js";

export class Image extends Component {

    DISPLAY_SRC;
    DISPLAY_BASE64;

    constructor(sourcePath) {
        let image = createImage(sourcePath);
        super(image);
        this._sourcePath = sourcePath;

        this._base64 = null;

        this._displayMethod = this.DISPLAY_SRC;
    }

    set sourcePath(src) {
        this._sourcePath = src;
        this._base64 = null;
        this._displayMethod = this.DISPLAY_SRC;
        this.element.src = src;
    }

    get sourcePath() {
        return this._sourcePath;
    }

    set base64(base64) {
        this._sourcePath = null;
        this._base64 = base64;
        this._displayMethod = this.DISPLAY_BASE64;
        this.element.src = "data:image/png;base64," + base64;
    }

    get base64() {
        return this._base64;
    }

}

function createImage(sourcePath) {
    let image = document.createElement('img');
    if (sourcePath) {
        image.src = sourcePath;
    }
    return image;
}

