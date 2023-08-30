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

        this.loadPlatform(platform);
    }

    async submit (platform, name, password) {
        if (name === "") {
            return;
        } 

        if (password === "") {
            return;
        }

        this.form.loading = true;
        await platform.localActions.connect(name, password);
    }

    get form () {
        return this._form;
    }

    loadPlatform(platform) {
    }

}


function createConnection() {
    let centraldiv = document.createElement("div");
    centraldiv.className = "central-div";

    let form = new Form("Se connecter");
    form.addAlternative("Je souhaite plutôt", "créer un compte");
    form.addInput("Nom d'utilisateur:", "text");
    form.addInput("Mot de passe:", "password");

    form.button.element.textContent = "Se connecter";

    appendChild(centraldiv, form);

    return [ centraldiv, form ];
}
