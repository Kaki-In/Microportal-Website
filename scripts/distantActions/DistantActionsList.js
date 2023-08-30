export class DistantActionsList {
    
    constructor() {
        this._actions = {
            "connectionFailed": (platform, args) => { this.connectionFailed(platform, args); }
        }
    }

    async execute(platform, message) {
        let name = message.name;
        let args = message.args;

        let action = this._actions[ name ];
        if (action === undefined) {
            console.warn("no action named " + name);
        } else {
            action(platform, args);
        }
    }

    connectionFailed(platform, args) {
        console.log(platform.ui.main.adapter.content);
        platform.ui.main.adapter.content.loading = false;
    }

    loadPlatform(platform) {
        platform.serverConnection.addEventListener("message", (message) => {
            this.execute(platform, message);
        })
    }
}