import { EventHandler } from "../../../events/EventHandler.js";
import { Script } from "./script/Script.js";

export class ScriptsList {

    constructor() {
        this._scripts = [];

        this._events = {
            "add": new EventHandler(),
            "update" : new EventHandler(),
            "remove": new EventHandler()
        }
    }

    updateScripts(scripts) {
        for (let script of scripts) {
            this.updateScript(script);
        }

        for (let oldscript of Object.keys(this._robots)) {
            let scriptFound = false;
            for (let script of scripts)
            {
                if (script.id === oldscript)
                {
                    scriptFound = true;
                }
            };
            if (!scriptFound) {
                let deletedScript = this._scripts[ oldscript];
                delete this._scripts[ oldscript ];
                this._events.remove.emit( deletedScript );
            };
        };
    }

    get scriptsIds () {
        return Object.keys(this._scripts);
    }

    updateScript(id, action, args, creationTime, modificationTime, name, published, robot, user) {
        let lastScript = this._script[ id ];
        if (lastScript) {
            lastScript.action = action;
            lastScript.args = args;
            lastScript.creationTime = creationTime;
            lastScript.modificationTime = modificationTime;
            lastScript.name = name;
            lastScript.published = published;
            lastScript.robot = robot;
            lastScript.user = user;
            this._events.update.emit(lastScript);
        } else {
            let newScript = new Script(id);
            newScript.action = action;
            newScript.args = args;
            newScript.creationTime = creationTime;
            newScript.modificationTime = modificationTime;
            newScript.name = name;
            newScript.published = published;
            newScript.robot = robot;
            newScript.user = user;
            this._scripts[ name ] = newScript;
            this._events.add.emit(newScript);
        }
    }

    getScriptById(name) {
        return this._scripts [ name ];
    }

    getScriptsByAuthor(user) {
        scripts = [];
        for (let script of this._scripts)
        {
            if (script.user === user)
            {
                scripts.push(script);
            };
        };
        return scripts;
    };

    getScriptsByRobot(robot) {
        scripts = [];
        for (let script of this._scripts)
        {
            if (script.robot === robot)
            {
                scripts.push(script);
            };
        };
        return scripts;
    };

    getPublishedScripts() {
        scripts = [];
        for (let script of this._scripts)
        {
            if (script.published)
            {
                scripts.push(script);
            };
        };
        return scripts;
    };

    addEventListener(name, func) {
        let event = this._events[ name ];
        if ( event === undefined ) {
            throw new ReferenceError( "no such event" );
        } else {
            event.connect( func );
        }
    }

}

