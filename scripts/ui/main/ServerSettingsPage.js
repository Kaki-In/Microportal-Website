import { appendChild, Component } from "../../../components/Component.js";
import { ServerConnectionAdapter } from "./disconnected/ServerConnectionAdapter.js";
import { Form } from "../../../components/Form.js";

export class ServerSettingsPage extends Component {

    constructor (platform) {
        let element = createServerSettings(platform);

        super(element[ 0 ]);
        this._adapter = element[ 1 ];
    }

}

function createServerSettings(platform) {
    let maindiv = document.createElement("div");
    maindiv.className = "main-div";

    let centraldiv = maindiv.appendChild(document.createElement("div"));
    centraldiv.className = "central-div";

    let form = new ServerConnectionAdapter(platform);

    appendChild(centraldiv, form);

    let div = maindiv.appendChild(document.createElement("div"));

    div.appendChild(document.createElement("h1")).textContent = "Informations sur les données personnelles";
    div.appendChild(document.createElement("p")).textContent = "Microportal nécessite une connexion non sécurisée (http://) pour fonctionner. Cette connexion sert uniquement à récupérer les informations de l'application en ligne. Toutes informations échangées entre votre appareil et votre serveur Microportal personnel seront gardées intactes à l'intérieur de votre réseau. Aucune information personnelle de quelque sorte n'est envoyé en ligne.";

    div.appendChild(document.createElement("h1")).textContent = "Qu'est-ce que Microportal?";
    div.appendChild(document.createElement("p")).textContent = "Microportal est une platforme domotique open source qui vous permet de gérer vos appareils de manière sécurisée, privée et rapide. ";

    div.appendChild(document.createElement("h1")).textContent = "Installation du serveur";
    div.appendChild(document.createElement("p")).textContent = "Microportal a été conçu pour fonctionner uniquement sur des systèmes d'exploitation basés sur Linux (Debian, Ubuntu, ...). ";
    div.appendChild(document.createElement("p")).innerHTML = `Le code source officiel de Microportal se trouve <a href="https://github.com/Kaki-In/Microportal" target="_blank"> sur Github </a>`;

    div.appendChild(document.createElement("h1")).textContent = "Installation des clients";
    div.appendChild(document.createElement("p")).innerHTML = `Le code source officiel des codes sources des robots pour Microportal se trouve <a href="https://github.com/Kaki-In/Microportal-Robot" target="_blank"> sur Github </a>`;

    return [ maindiv, form ];
}