import { HeaderComponent } from "../../../components/Header.js";
import { Adapter } from "../../../components/Adapter.js";
import { Loader } from "../../../components/Loader.js";

import { HeaderDefault } from "./HeaderDefault.js";
import { HeaderConnected } from "./HeaderConnected.js";
import { HeaderLoading } from "./HeaderLoading.js";

export class HeaderUI extends HeaderComponent {
    
    constructor() {
        let adapter = new Adapter();
        adapter.content = new HeaderLoading();
        super(adapter);
    }

    load(platform) {
        this.adapter.content = new HeaderDefault(platform);

        platform.serverConnection.addEventListener("close", () => { this.reset(); })
        platform.context.world.addEventListener("userChanged", () => { 
            this.adapter.content = new HeaderConnected(platform);
        })
    }

    reset() {
        this.adapter.content = new HeaderLoading();
    }

}
 