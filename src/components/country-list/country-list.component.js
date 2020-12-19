import { CovidDashboardService } from "../../core/index";
import { Chart } from "./chart/index";
import { countryListTemplate } from "./country-list.template";
import { Keyboard } from "../keyboard/index";

export class CountryList {
    constructor() {
        this.chart = new Chart();
        this.service = new CovidDashboardService();
        this.titleCurrentCategory = "Cases";
    }

    init() {
        const list = document.querySelector(".country-list");
        list.insertAdjacentHTML("beforeend", countryListTemplate);
        this.service.getFullInformationCountry().then((items) => this.viewData(items));
    }

    viewData(data) {
        this.chart.init(data);
        this.chart.render(data);
        Keyboard.init();

        setInterval(() => this.chart.search(), 1000);

        const keyboardButton = document.querySelector(".country-list-keyboard");

        keyboardButton.addEventListener("click", () => {
            document.querySelector(".keyboard--hidden") ? Keyboard.show() : Keyboard.hide();
        });
    }
}
