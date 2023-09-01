import { Component, appendChild } from "../../../components/Component.js";
import { Form } from "../../../components/Form.js";

export class MailVerificationPage extends Component{

    constructor (platform, name, password) {
        let element = createMailVerification(name);

        super(element[ 0 ]);

        this._form = element[ 1 ];

        this.form.addEventListener("submit", (name, code) => { 
            this.submit(platform, name, code); 
        })

        this._userInformations = {
            name: name,
            password: password
        };

        platform.ui.title = "Vérifiez votre adresse mail";
   }

    get form () {
        return this._form;
    }

    async submit(platform, code) {
        if ( code.length !== 6 ) {
            let notification = platform.ui.notifications.createNotification("warning");
            notification.title = "Entrées invalides";
            notification.text = "Un code doit être composé de 6 caractères";
            return ;
        }

        let name = this._userInformations.name;
        let password = this._userInformations.password;

        this.form.loading = true;
        let result = await platform.localActions.verifyMailAddress(name, password, code);
        this.form.loading = false;

        if (result.state === "failed") {
            let notification = platform.ui.notifications.createNotification("error");
            notification.title = "Impossible de valider votre adresse";
            notification.text = result.result.message;
        } else {
            let notification = platform.ui.notifications.createNotification("info");
            notification.title = "Adresse validée";
            notification.text = "Vous pouvez à présent vous connecter";
            platform.ui.main.openConnectionPage(platform);
        }
    }

}

function createMailVerification(name) {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let form = new Form("Vérifier mon adresse mail");
    form.addInput("Code envoyé à l'utilisateur " + name, "text", true);

    form.button.element.textContent = "Vérifier mon adresse";

    appendChild(centraldiv, form);

    return [ centraldiv, form ];
}