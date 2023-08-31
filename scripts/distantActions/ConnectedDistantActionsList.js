export class ConnectedDistantActionsList {
    
    constructor() {
        this._actions = {
            "updateUserInformations": (platform, args) => {
                platform.localActions.resolveUserFetch("success", args);
            },
            "robotActionSent": (platform, args) => {
                let id = args.request;
                platform.context.requests.registerRequestId(id);
            },
            "robotActionError": (platform, args) => {
                let notification = platform.ui.notifications.createNotification("error");
                notification.title = "Une erreur s'est produite lors de l'envoi d'une requête"
                notification.text = args.message;
            },
            "requestProcessing": (platform, args) => {
                let request = platform.context.requests.findRequestById(args.id);
                request.state = "sent";
            },
            "requestProcessed": (platform, args) => {
                let request = platform.context.requests.findRequestById(args.id);
                request.result = args.result;
            },
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