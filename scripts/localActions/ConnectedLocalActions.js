export class ConnectedLocalActions {
    constructor(platform) {
        this._platform = platform;

        this._userFetch = {
        };

        this._robotFetch = {
        };

        this._usersListResolve = null;
        this._robotsListResolve = null;

    }

    async fetchUser(name) {
        let fetchPromise = new Promise(async (resolve) => {
            this._userFetch[ name ] = resolve;
            let request = this._platform.serverConnection.createRequest("getUserInformations", {"name": name});
            await this._platform.serverConnection.send(request);
        });

        return await fetchPromise;
    }

    async fetchRobot(mac) {
        let fetchPromise = new Promise(async (resolve) => {
            this._robotFetch[ mac ] = resolve;
            let request = this._platform.serverConnection.createRequest("getRobotInformations", {"mac": mac});
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

    async getUsersList() {
        let request = this._platform.serverConnection.createRequest("getUsersList", {});
        await this._platform.serverConnection.send(request);

        this._usersList = new Promise((resolve, reject) => {
            this._usersListResolve = resolve;
        });

        return await this._usersList;
    }

    async getRobotsList() {
        let request = this._platform.serverConnection.createRequest("getRobotsList", {});
        await this._platform.serverConnection.send(request);

        this._robotsList = new Promise((resolve, reject) => {
            this._robotsListResolve = resolve;
        });

        return await this._robotsList;
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

    resolveRobotFetch(state, result) {
        let mac = result.mac;
        if (this._robotFetch[ mac ]) {
            this._robotFetch[ mac ] ({
                state: state,
                result: result
            });
            this._robotFetch[ mac ] = undefined;
        }
    } 

    resolveUsersList(ulist) {
        if (this._usersListResolve) {
            this._usersListResolve(ulist);
        }
    }

    resolveRobotsList(rlist) {
        if (this._robotsListResolve) {
            this._robotsListResolve(rlist);
        }
    }

}