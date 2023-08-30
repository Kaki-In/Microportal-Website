import { Component, appendChild } from "../../../components/Component.js";
import { Form } from "../../../components/Form.js";

export class CreationPage extends Component{

    constructor (platform) {
        let element = createCreation();

        super(element[ 0 ]);

        this._form = element[ 1 ];

        this.form.addEventListener("submit", (name, mail, password, password2) => { 
            this.submit(platform, name, mail, password, password2); 
        })

        this.form.alternatives[ 0 ].addEventListener("click", () => {
            platform.ui.main.openConnectionPage(platform);
        })

        this.loadPlatform(platform);
    }

    loadPlatform(platform) {
    }

    get form () {
        return this._form;
    }

    async submit(platform, name, mail, password, password2) {
        if ( password !== password2 ) {
            let notification = platform.ui.notifications.createNotification("warning");
            notification.title = "Entrées invalides";
            notification.text = "Les mots de passe ne correspondent pas";
            return ;
        }

        this.form.loading = true;
        let result = await platform.localActions.createAccount(name, mail, password);
        this.form.loading = false;

        if (result.state === "failed") {
            let notification = platform.ui.notifications.createNotification("error");
            notification.title = "Impossible de créer votre compte";
            notification.text = result.result.message;
        } else if (result.state === "mail") {
            platform.localActions.startVerifyMailAddress(name, password);
        }
    }

}

function createCreation() {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let form = new Form("Créer un nouveau compte");
    form.addAlternative("Je souhaite plutôt", "me connecter");
    form.addInput("Nom d'utilisateur:", "text", true);
    form.addInput("Adresse mail", "mail", true);
    form.addInput("Mot de passe:", "password", true);
    form.addInput("Confirmez votre mot de passe:", "password", true);

    form.button.element.textContent = "Créer mon compte";

    appendChild(centraldiv, form);

    return [ centraldiv, form ];
}