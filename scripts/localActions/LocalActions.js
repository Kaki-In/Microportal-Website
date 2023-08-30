export class LocalActions {
    constructor(platform) {
        this._platform = platform;
    }

    async connect(name, password) {
        let request = this._platform.serverConnection.createRequest("connectToAccount", {"name": name, "password": password});
        await this._platform.serverConnection.send(request);
    }
}