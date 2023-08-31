export class LocalActions {
    constructor(platform) {
        this._platform = platform;

        this._connectResolve = null;
        this._createResolve = null;
        this._verifyResolve = null;
    }

    async connect(name, password) {
        let connectPromise = new Promise(async (resolve) => {
            this._connectResolve = resolve;
            let request = this._platform.serverConnection.createRequest("connectToAccount", {"name": name, "password": password});
            await this._platform.serverConnection.send(request);
        });

        return await connectPromise;
    }

    async createAccount(name, mail, password) {
        let createPromise = new Promise(async (resolve) => {
            this._createResolve = resolve;
            let request = this._platform.serverConnection.createRequest("createAccount", {"name": name, "mail": mail, "password": password});
            await this._platform.serverConnection.send(request);
        });

        return await createPromise;
    }

    async verifyMailAddress(name, password, code) {
        let verifyPromise = new Promise(async (resolve) => {
            this._verifyResolve = resolve;
            let request = this._platform.serverConnection.createRequest("verifyMail", {"name": name, "code": code, "password": password});
            await this._platform.serverConnection.send(request);
        });

        return await verifyPromise;
    }

    resolveConnection(state, result) {
        if (this._connectResolve) {
            this._connectResolve({
                state: state,
                result: result
            });
            this._connectResolve = null;
        }
    } 

    resolveCreation(state, result) {
        if (this._createResolve) {
            this._createResolve({
                state: state,
                result: result
            });
            this._createResolve = null;
        }
    } 

    resolveVerification(state, result) {
        if (this._verifyResolve) {
            this._verifyResolve({
                state: state,
                result: result
            });
            this._verifyResolve = null;
        }
    } 

    startVerifyMailAddress(name, password) {
        platform.ui.main.openMailVerificationPage(platform, name, password);
    }

}