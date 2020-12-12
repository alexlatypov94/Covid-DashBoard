import { globalTableTemplate } from "./global-table.template";

export class GlobalTable {
    init() {
        this.render();
    }

    render() {
        const table = document.querySelector(".table");
        table.insertAdjacentHTML("beforeend", globalTableTemplate);
    }

    initTableInfo() {}
}
