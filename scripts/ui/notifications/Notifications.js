import { Component, appendChild } from "../../../components/Component.js";
import { Notification } from "./Notification.js";

export class Notifications extends Component {

    constructor() {
        super(document.body.querySelector('section#notifications'));
    }

    createNotification(state) {
        let notification = new Notification(state);
        appendChild(this.element, notification);
        setTimeout(() => {notification.destroy()}, 3000);
        return notification;
    }

}

