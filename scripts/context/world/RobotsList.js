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
            this.updateRobot(robot.mac, robot.name, robot.type, robot.last_connection, robot.connected);
        };

        for (let oldrobot of Object.keys(this._robots)) {
            let robotFound = false;
            for (let robot of robots)
            {
                if (robot.mac === oldrobot)
                {
                    robotFound = true;
                }
            };
            if (!robotFound) {
                let deletedRobot = this._robots[ oldrobot];
                delete this._robots[ oldrobot ];
                this._events.remove.emit( deletedRobot );
            };
        };
    }

    get robotsMacAddresses () {
        return Object.keys(this._robots);
    }

    updateRobot(mac, name, type, last_connection, connected) {
        let lastRobot = this._robots[ mac ];
        if (lastRobot) {
            lastRobot.type = type;
            lastRobot.name = name;
            lastRobot.last_connection = last_connection;
            lastRobot.connected = connected;
            this._events.update.emit(lastRobot);
        } else {
            let newRobot = new Robot(mac, name, type, last_connection, connected);
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

