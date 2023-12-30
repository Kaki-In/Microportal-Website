import { EventHandler } from "../../../events/EventHandler.js";
import { Robot } from "./robot/Robot.js";

export class RobotsList {

    constructor() {
        this._robots = {};

        this._events = {
            "add": new EventHandler(),
            "update" : new EventHandler(),
            "remove": new EventHandler()
        }
    }

    updateRobots(robots) {
        for (let robot of robots) {
            this.updateRobot(robot.mac, robot.name, robot.type, robot.last_connection);
        };

        for (let robot of Object.keys(this._robots)) {
            if (!robots[ robot.mac ]) {
                let deletedRobot = this._robots[ robot.mac ];
                delete this._robots[ robot.mac ];
                this._events.remove.emit( deletedRobot );
            };
        };
    }

    get robotNames () {
        return Object.keys(this._robots);
    }

    updateRobot(mac, name, type, last_connection) {
        let lastRobot = this._robots[ mac ];
        if (lastRobot) {
            lastRobot.type = type;
            lastRobot.name = name;
            lastRobot.last_connection = last_connection;
            this._events.update.emit(lastRobot);
        } else {
            let newRobot = new Robot(mac, type, name, last_connection);
            this._robots[ mac ] = newRobot;
            this._events.add.emit(newRobot);
        }
    }

    getRobotByMacAddress(mac) {
        return this._robots [ mac ];
    }

    addEventListener(name, func) {
        let event = this._events[ name ];
        if ( event === undefined ) {
            throw new ReferenceError( "no such event" );
        } else {
            event.connect( func );
        }
    }

}

