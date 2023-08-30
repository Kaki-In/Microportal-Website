import { Component } from "./Component.js"; 

export class Adapter extends Component {

    constructor() {
        super(document.createComment("Nothing to display..."));
        this._content = null;
    }

    get content() {
        return this._content;
    }

    set content(content) {
        this.element = content.element;
        this._content = content;
    }


}