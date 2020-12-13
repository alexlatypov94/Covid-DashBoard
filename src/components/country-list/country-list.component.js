import { CovidDashboardService } from "../../core/index";
import { Chart } from "./chart/index";
import { countryListTemplate } from "./country-list.template";

export class CountryList {
    constructor() {
        this.chart = new Chart();
        this.service = new CovidDashboardService();
        // this.countriesArray=null;
    }

    init() {
        // const value = "belarus";
        // this.service.getDayOne(value).then((data) => this.viewData(data));
        const list = document.querySelector(".country-list");
        list.insertAdjacentHTML("beforeend", countryListTemplate);
        this.chart.init();
        this.service.getSummary().then((items) => this.appendFlags(items));
        // this.service.getFlagsAndPopulations().then((data) => this.storeFlags(data));
    }

    viewData(data) {
        this.chart.log(data);
        this.chart.render(data);

        const input = document.querySelector(".country-input");
        input.addEventListener("keyup", () => {
            this.chart.serch();
        });
    }

    appendFlags(data) {
        const countries = data.countries.sort((a, b) => (b.country < a.country ? 1 : -1));
        this.service.getFlagsAndPopulations().then((flags) => {
            countries.forEach((el) => {
                flags.forEach((flag) => {
                    if (el.country === flag.name) {
                        el.flag = flag.flag;
                    }
                });
            });

            this.viewData(countries);
        });
    }
}
