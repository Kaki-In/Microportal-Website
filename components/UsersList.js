import { Component, appendChild } from "./Component.js";
import { UserThumbnail } from "./UserThumbnail.js";

export class UsersList extends Component {

    constructor(usersList, onUserClick) {
        let element = createUsersList(usersList, onUserClick);
        super(element);

        usersList.addEventListener("add", (user) => {this.addUser(user)});
        usersList.addEventListener("remove", (user) => {this.removeUser(user)});
        usersList.addEventListener("update", (user) => {this.updateUser(user)});

        this._list = usersList;
        this._onClick = onUserClick;

    }

    addUser(user) {
        this.element = createUsersList(this._list, this._onClick);
    }

    removeUser(user) {
        this.element = createUsersList(this._list, this._onClick);
    }

    updateUser(user) {
        this.element = createUsersList(this._list, this._onClick);
    }

}

function createUsersList(usersList, onUserClick) {

    let div = document.createElement("div");
    div.classList.add("list-users");

    for (let username of usersList.userNames) {
        let user = usersList.getUserByName(username);
        
        let userthumb = new UserThumbnail(user);
        userthumb.addEventListener("click", () => { onUserClick(user) })
        appendChild(div, userthumb);
    }

    return div;

}

