import { Component, appendChild } from "./Component.js";
import { RobotThumbnail } from "./RobotThumbnail.js";

export class RobotsList extends Component {

    constructor(robotsList, onRobotClick) {
        let element = createRobotsList(robotsList, onRobotClick);
        super(element);

        robotsList.addEventListener("add", (robot) => {this.addRobot(robot)});
        robotsList.addEventListener("remove", (robot) => {this.removeRobot(robot)});
        robotsList.addEventListener("update", (robot) => {this.updateRobot(robot)});

        this._list = robotsList;
        this._onClick = onRobotClick;

    }

    addRobot(robot) {
        this.element = createRobotsList(this._list, this._onClick);
    }

    removeRobot(robot) {
        this.element = createRobotsList(this._list, this._onClick);
    }

    updateRobot(robot) {
        this.element = createRobotsList(this._list, this._onClick);
    }

}

function createRobotsList(robotsList, onRobotClick) {

    let div = document.createElement("div");
    div.classList.add("list-robots");

    let table = div.appendChild(document.createElement("table"));

    let tr = table.appendChild(document.createElement("thead")).appendChild(document.createElement("tr"));
    for (let i=0; i < 5; i++)
    {
        tr.appendChild(document.createElement("th")).textContent = [ "", "Nom", "Adresse MAC", "Type", "Dernière connexion" ] [i];
    };

    let tbody = table.appendChild(document.createElement("tbody"));

    for (let robotMac of robotsList.robotsMacAddresses) {
        let robot = robotsList.getRobotByMacAddress(robotMac);
        
        let robotthumb = new RobotThumbnail(robot);
        robotthumb.addEventListener("click", () => { onRobotClick(robot) })
        appendChild(tbody, robotthumb);
    }

    return div;

}

