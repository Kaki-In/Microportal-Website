import { Component, appendChild } from "./Component.js";

export class HeaderComponent extends Component {

    constructor(adapter) {
        let header = document.querySelector("header");

        super(header);

        appendChild(header, adapter);

        this.__adapter__ = adapter;
    }

    get adapter() {
        return this.__adapter__;
    }

}
