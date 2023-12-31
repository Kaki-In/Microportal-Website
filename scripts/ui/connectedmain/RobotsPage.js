import { Component, appendChild } from "../../../components/Component.js";
import { RobotsList } from "../../../components/RobotsList.js";

export class RobotsPage extends Component {

    constructor (platform) {
        let element = createRobotsList(platform.context.world.robots);

        super(element);

        platform.localActions.getRobotsList();

    }

}

function createRobotsList(robotsList) {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let div = centraldiv.appendChild(document.createElement("div"));

    div.appendChild(document.createElement("h1")).textContent = "Robots enregistrés";

    let robots = new RobotsList(robotsList, (robot) => {console.log(robot)});

    appendChild(div, robots);

    centraldiv.appendChild(div);

    return centraldiv;
}