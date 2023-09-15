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
    div.appendChild(document.createElement("p")).textContent = "Microportal nécessite une connexion non sécurisée (http://) pour fonctionner. Cette connexion sert uniquement à récupérer les informations de l'application en ligne. Toutes informations échangées entre votre appareil et votre serveur Microportal ou votre serveur web personnels seront gardées intactes à l'intérieur de votre réseau. Aucune information personnelle de quelque sorte n'est envoyée sur Internet.";
    div.appendChild(document.createElement("p")).textContent = "Par souci de sécurité, la version hôtée en ligne a été retirée, en raison de manque de respect de la vie privée sur les cookies, nécessairement envoyés en clairs par les navigateurs, sans que ce soit vraiment utile. ";

    return [ maindiv, form ];
}