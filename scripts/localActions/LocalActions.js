export class LocalActions {
    constructor(platform) {
        this._platform = platform;

        this._connectResolve = [];
        this._createResolve = [];
        this._verifyResolve = [];

        let username = platform.context.shelve.username;
        let password = platform.context.shelve.password;
        if ( username !== undefined && password !== undefined) {
            this.connect(username, password);
        }
    }

    async connect(name, password) {
        let connectPromise = new Promise(async (resolve) => {
            this._connectResolve.push(resolve);
            let request = this._platform.serverConnection.createRequest("connectToAccount", {"name": name, "password": password});
            await this._platform.serverConnection.send(request);
        });

        return await connectPromise;
    }

    async createAccount(name, mail, password) {
        let createPromise = new Promise(async (resolve) => {
            this._createResolve.push(resolve);
            let request = this._platform.serverConnection.createRequest("createAccount", {"name": name, "mail": mail, "password": password});
            await this._platform.serverConnection.send(request);
        });

        return await createPromise;
    }

    async verifyMailAddress(name, password, code) {
        let verifyPromise = new Promise(async (resolve) => {
            this._verifyResolve.push(resolve);
            let request = this._platform.serverConnection.createRequest("verifyMail", {"name": name, "code": code, "password": password});
            await this._platform.serverConnection.send(request);
        });

        return await verifyPromise;
    }

    resolveConnection(state, result) {
        this._connectResolve.pop()?.({
            state: state,
            result: result
        });
    } 

    resolveCreation(state, result) {
        this._createResolve.pop()?.({
            state: state,
            result: result
        });
    } 

    resolveVerification(state, result) {
        this._verifyResolve.pop()?.({
            state: state,
            result: result
        });
    } 

    startVerifyMailAddress(name, password) {
        platform.ui.main.openMailVerificationPage(platform, name, password);
    }

}