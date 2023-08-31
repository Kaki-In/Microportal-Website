export class ConnectedDistantActionsList {
    
    constructor() {
        this._actions = {
            "updateUserInformations": (platform, args) => {
                platform.localActions.resolveUserFetch("success", args);
            },
            "robotActionSent": (platform, args) => {
            }
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

}