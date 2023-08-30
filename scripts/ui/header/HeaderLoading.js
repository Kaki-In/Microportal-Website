import { HeaderContent } from "../../../components/HeaderContent.js";
import { Loader } from "../../../components/Loader.js";

export class HeaderLoading  extends HeaderContent {

    constructor () {
        super();

        let loader = new Loader();

        this.addSpace();
        this.addComponent(loader);
        this.addSpace();
    }

}
