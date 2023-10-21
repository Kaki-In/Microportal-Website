import { Component, appendChild } from "../../../components/Component.js";
import { UsersList } from "../../../components/UsersList.js";

export class CommunityPage extends Component {

    constructor (platform) {
        let element = createCommunity(platform.context.world.users);

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