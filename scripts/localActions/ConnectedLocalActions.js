export class ConnectedLocalActions {
    constructor(platform) {
        this._platform = platform;

        this._userFetch = {
        };

    }

    async fetchUser(name) {
        let fetchPromise = new Promise(async (resolve) => {
            this._userFetch[ name ] = resolve;
            let request = this._platform.serverConnection.createRequest("getUserInformations", {"name": name});
            await this._platform.serverConnection.send(request);
        });

        return await fetchPromise;
    }

    async sendRobotAction(robot, action, args) {
        let newreq = this._platform.context.requests.create(action, args);
        let request = this._platform.serverConnection.createRequest("sendRobotAction", {
            robot: robot,
            action: action,
            args: args
        });
        await this._platform.serverConnection.send(request);
        return await newreq.resultPromise;
    }

    resolveUserFetch(state, result) {
        let name = result.name;
        if (this._userFetch[ name ]) {
            this._userFetch[ name ] ({
                state: state,
                result: result
            });
            this._userFetch[ name ] = undefined;
        }
    } 

}