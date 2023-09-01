import { appendChild, Component } from "../../../components/Component.js";
import { Form } from "../../../components/Form.js";

export class ServerSettingsPage extends Component {

    constructor (platform) {
        let element = createServerSettings();

        super(element[ 0 ]);

        this._form = element[ 1 ];
        this._form.inputs[ 0 ].value = platform.context.shelve.address || "";
        this._form.addEventListener("submit", (serverName) => {
            this._form.loading = true;
            platform.loadConnection(serverName, 8266);
        });
        this._form.checkValidity();
    }

}

function createServerSettings() {
    let maindiv = document.createElement("div");
    maindiv.className = "main-div";

    let centraldiv = maindiv.appendChild(document.createElement("div"));
    centraldiv.className = "central-div";

    let form = new Form("Se connecter à un serveur microportal");
    form.addInput("Adresse du serveur:", "text", true);

    form.button.element.textContent = "Se connecter";

    appendChild(centraldiv, form);

    let div = maindiv.appendChild(document.createElement("div"));

    div.appendChild(document.createElement("h1")).textContent = "Qu'est-ce que Microportal?";
    div.appendChild(document.createElement("p")).textContent = "Microportal est une platforme domotique open source qui vous permet de gérer vos appareils de manière sécurisée, privée et rapide. ";

    div.appendChild(document.createElement("h1")).textContent = "Installation du serveur";
    div.appendChild(document.createElement("p")).textContent = "Microportal a été conçu pour fonctionner uniquement sur des systèmes d'exploitation basés sur Linux (Debian, Ubuntu, ...). ";
    div.appendChild(document.createElement("p")).innerHTML = `Le code source officiel de Microportal se trouve <a href="https://github.com/Kaki-In/Microportal" target="_blank"> sur Github </a>`;

    div.appendChild(document.createElement("h1")).textContent = "Installation des clients";
    div.appendChild(document.createElement("p")).innerHTML = `Le code source officiel des codes sources des robots pour Microportal se trouve <a href="https://github.com/Kaki-In/Microportal-Robot" target="_blank"> sur Github </a>`;

    return [ maindiv, form ];
}