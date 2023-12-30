import { Component, appendChild } from "../../../../components/Component.js";
import { List } from "../../../../components/List.js";

export class ScriptsPage extends Component {

    constructor (platform) {
        let element = createCommunity(platform.context.world.scripts);

        super(element);

        platform.localActions.getUsersList();

    }

}

function createCommunity(usersList) {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let div = centraldiv.appendChild(document.createElement("div"));

    div.appendChild(document.createElement("h1")).textContent = "Communauté";

    let users = new UsersList(usersList, (user) => {console.log(user)});

    appendChild(div, users);

    centraldiv.appendChild(div);

    return centraldiv;
}