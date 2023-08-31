import { Component, appendChild } from "../../../components/Component.js";
import { Button } from "../../../components/Button.js";

export class ConnectedPage extends Component {

    constructor(platform) {
        let button = createConnectedPage();
        super(button.element);
        this._button = button;
    }

}


function createConnectedPage() {
    let button = new Button("Ouvrir le portail");
}
