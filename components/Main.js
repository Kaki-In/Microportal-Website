import { Component, appendChild } from "./Component.js";

export class MainComponent extends Component {

    constructor(adapter) {
        let element = document.getElementsByTagName("main")[ 0 ];

        if (element === null) {
            throw ReferenceError("couldn't find main element");
        }

        element.innerHTML = "";

        super(element);

        appendChild(element, adapter);
        this.__adapter__ = adapter;
    }

    get adapter() {
        return this.__adapter__;
    }

}