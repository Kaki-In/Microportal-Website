import { Component, appendChild } from "./Component.js";
import { Adapter } from "./Adapter.js";
import { Image } from "./Image.js";

export class RobotThumbnail extends Component {

    constructor(robot) {
        let thumbnail = createThumbnail(robot);

        super(thumbnail);

        this._image = thumbnail.querySelector("img").component;

        this._robot = robot;
    }

    get robot() {
        return this._robot;
    }

    addEventListener(name, func) {
        this.element.addEventListener(name, func);
    }

}

function createThumbnail(robot) {
    let tr = document.createElement("tr");
    tr.classList.add("robot-thumbnail");

    appendChild(tr.appendChild(document.createElement("td")), new Image("./static/images/robotTypes/" + robot.type + ".png"));
 
    tr.appendChild(document.createElement("td")).textContent = robot.name;
    tr.appendChild(document.createElement("td")).textContent = robot.mac;
    tr.appendChild(document.createElement("td")).textContent = robot.type;
    tr.appendChild(document.createElement("td")).textContent = robot.last_connection.toLocaleString();

    return tr;
}

