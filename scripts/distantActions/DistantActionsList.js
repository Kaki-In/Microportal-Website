export class DistantActionsList {
    
    constructor() {
        this._actions = {
            "connectionFailed": (platform, args) => {
                platform.localActions.resolveConnection("failed", args);
            },
            "connectionSuccess": (platform, args) => {
                platform.localActions.resolveConnection("success", args);
                platform.context.world.setUser(args.user, "");
            },
            "accountCreationFailed": (platform, args) => {
                platform.localActions.resolveCreation("failed", args);
            },
            "startMailVerification": (platform, args) => {
                let notification = platform.ui.notifications.createNotification("info");
                notification.title = "Vérification de l'adresse mail";
                notification.text = "Un mail a été envoyé à l'adresse " + args.address;

                platform.localActions.resolveConnection("mail", args);
                platform.localActions.resolveCreation("mail", args);
            },
            "mailVerificationFailed": (platform, args) => {
                platform.localActions.resolveVerification("failed", args);
            },
            "mailVerificationSuccess": (platform, args) => {
                platform.localActions.resolveVerification("success", args);
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