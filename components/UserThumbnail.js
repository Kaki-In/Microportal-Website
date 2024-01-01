import { Component, appendChild } from "./Component.js";
import { Adapter } from "./Adapter.js";
import { Image } from "./Image.js";

export class UserThumbnail extends Component {

    constructor(user) {
        let thumbnail = createThumbnail(user);

        super(thumbnail);

        this._image = thumbnail.querySelector("img").component;

        this._user = user;
    }

    get user() {
        return this._user;
    }

    addEventListener(name, func) {
        this.element.addEventListener(name, func);
    }

}

function createThumbnail(user) {
    let name = user.name;
    let icon = user.icon.data;
    let connected = user.connected;

    let div = document.createElement("div");
    div.classList.add("user-thumbnail");

    if (user.connected)
    {
        div.classList.add("connected");
    };

    let flexdiv = document.createElement("div");
 
    let img = new Image();
    img.base64 = icon;
    appendChild(flexdiv, img);

    let p = document.createElement("p");
    p.textContent = name;

    flexdiv.appendChild(p);

    div.appendChild(document.createElement("span"));
    div.appendChild(flexdiv);

    return div;
}

