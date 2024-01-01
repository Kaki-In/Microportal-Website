export class ConnectedDistantActionsList {
    
    constructor() {
        this._actions = {
            "updateUserInformations": (platform, args) => {
                platform.context.world.users.updateUser(args.name, args.icon, args.last_connection, args.connected);
                platform.localActions.resolveUserFetch("success", args);
            },
            "updateRobotInformations": (platform, args) => {
                platform.context.world.robots.updateRobot(args.mac, args.name, args.type, args.last_connection, args.connected);
                platform.localActions.resolveRobotFetch("success", args);
            },
            "robotActionSent": (platform, args) => {
                let id = args.request;
                platform.context.requests.registerRequestId(id);
            },
            "robotActionError": (platform, args) => {
                let notification = platform.ui.notifications.createNotification("error");
                notification.title = "Une erreur s'est produite lors de l'envoi d'une requête"
                notification.text = args.message;

                platform.context.requests.registerRequestError();
            },
            "requestProcessing": (platform, args) => {
                let request = platform.context.requests.findRequestById(args.id);
                request.state = "sent";
            },
            "requestProcessed": (platform, args) => {
                let request = platform.context.requests.findRequestById(args.id);
                request.result = args.result;
            },
            "updateUsersList": async (platform, args) => {
                platform.localActions.resolveUsersList(args.users);
                let users = [];
                for (let user of args.users) {
                    let result = await platform.localActions.fetchUser(user);
                    users.push(result.result);
                }
                platform.context.world.users.updateUsers(users);
            },
            "updateRobotsList": async (platform, args) => {
                platform.localActions.resolveRobotsList(args.robots);
                let robots = [];
                for (let robot of args.robots) {
                    let result = await platform.localActions.fetchRobot(robot);
                    robots.push(result.result);
                }
                platform.context.world.robots.updateRobots(robots);
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