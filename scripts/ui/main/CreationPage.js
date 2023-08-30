import { Component, appendChild } from "../../../components/Component.js";
import { Form } from "../../../components/Form.js";

export class CreationPage extends Component{

    constructor (platform) {
        let element = createCreation();

        super(element[ 0 ]);

        this._form = element[ 1 ];

        this.form.addEventListener("submit", (name, mail, password, password2) => { 
            this.submit(name, mail, password, password2); 
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

    submit(name, mail, password, password2) {

    }

}

function createCreation() {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let form = new Form("Créer un nouveau compte");
    form.addAlternative("Je souhaite plutôt", "me connecter");
    form.addInput("Nom d'utilisateur:", "text");
    form.addInput("Adresse mail", "mail");
    form.addInput("Mot de passe:", "password");
    form.addInput("Confirmez votre mot de passe:", "password");

    form.button.element.textContent = "Créer mon compte";

    appendChild(centraldiv, form);

    return [ centraldiv, form ];
}