export class ConnectedLocalActions {
    constructor(platform) {
        this._platform = platform;

        this._userFetch = {
        };

        this._robotFetch = {
        };

        this._usersListResolve = [];
        this._robotsListResolve = [];

    }

    async fetchUser(name) {
        let fetchPromise = new Promise(async (resolve) => {
            let fname = this._userFetch[ name ];
            if (fname === undefined)
            {
                this._userFetch[ name ] = [resolve];
            } else {
                this._userFetch[ name ].push(resolve);
            };
            let request = this._platform.serverConnection.createRequest("getUserInformations", {"name": name});
            await this._platform.serverConnection.send(request);
        });

        return await fetchPromise;
    };

    async fetchRobot(mac) {
        let fetchPromise = new Promise(async (resolve) => {
            let frobot = this._robotFetch[ mac ]
            if (frobot === undefined)
            {
                this._robotFetch[ mac ] = [resolve];
            } else {
                this._robotFetch[ mac ].push(resolve);
            };
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
            this._usersListResolve.push(resolve);
        });

        return await this._usersList;
    }

    async getRobotsList() {
        let request = this._platform.serverConnection.createRequest("getRobotsList", {});
        await this._platform.serverConnection.send(request);

        this._robotsList = new Promise((resolve, reject) => {
            this._robotsListResolve.push(resolve);
        });

        return await this._robotsList;
    }

    resolveUserFetch(state, result) {
        let name = result.name;
        this._userFetch[ name ]?.pop()?.({
            state: state,
            result: result
        });
    } 

    resolveRobotFetch(state, result) {
        let mac = result.mac;
        this._robotFetch[ mac ]?.pop()?.({
            state: state,
            result: result
        });
    } 

    resolveUsersList(ulist) {
        this._usersListResolve?.pop()?.(ulist);
    }

    resolveRobotsList(rlist) {
        this._robotsListResolve?.pop()?.(rlist);
    }

}