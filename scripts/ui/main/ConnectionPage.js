import { Component, appendChild } from "../../../components/Component.js";
import { Form } from "../../../components/Form.js";

export class ConnectionPage extends Component {

    constructor (platform) {
        let element = createConnection();

        super(element[ 0 ]);

        this._form = element[ 1 ];

        this.form.addEventListener("submit", (name, password) => { 
            this.submit(platform, name, password); 
        })

        this.form.alternatives[ 0 ].addEventListener("click", () => {
            platform.ui.main.openCreationPage(platform);
        })

        platform.ui.title = "Se connecter";
    }

    async submit (platform, name, password) {
        this.form.loading = true;
        let result = await platform.localActions.connect(name, password);
        this.form.loading = false;

        if (result.state === "failed") {
            let notification = platform.ui.notifications.createNotification("error");
            notification.title = "Impossible de vous connecter à votre compte";
            notification.text = result.result.message;
        } else if (result.state === "mail") {
            platform.localActions.startVerifyMailAddress(name, password);
        } else {
            platform.context.shelve.username = name;
            platform.context.shelve.password = password;

            let notification = platform.ui.notifications.createNotification("success");
            notification.title = "Connecté à " + result.result.user;
            notification.text = "Connexion effectuée avec succès";
        }
    }

    get form () {
        return this._form;
    }

}


function createConnection() {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let form = new Form("Se connecter");
    form.addAlternative("Je souhaite plutôt", "créer un compte");
    form.addInput("Nom d'utilisateur:", "text", true);
    form.addInput("Mot de passe:", "password", true);

    form.button.element.querySelector("text").textContent = "Se connecter";

    appendChild(centraldiv, form);

    return [ centraldiv, form ];
}
