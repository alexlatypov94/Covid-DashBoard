import { CovidDashboardService } from "../../core/index";
import { Chart } from "./chart/index";
import { countryListTemplate } from "./country-list.template";

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

        const input = document.querySelector(".country-list-country-input");

        input.addEventListener("keyup", () => {
            this.chart.search();
        });
    }
}
