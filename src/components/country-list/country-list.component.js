import { CovidDashboardService, COLOR_PALETTE } from "../../core/index";
import { Chart } from "./chart/index";
import { countryListTemplate } from "./country-list.template";
import { Keyboard } from "../keyboard/index";
import { createGlobalClick, clickChooseCountry } from "../util/index";

export class CountryList {
    constructor() {
        this.chart = new Chart();
        this.service = new CovidDashboardService();
        this.titleCurrentCategory = "Cases";
        this.paramNewOrTotal = "total";
        this.param = `${this.paramNewOrTotal}${this.titleCurrentCategory}`;
        this.counterSwitch = 0;
        this.dataFullCountry = undefined;
        this.data = undefined;
        this.checkDataPopulations = false;
    }

    init() {
        const list = document.querySelector(".country-list");
        list.insertAdjacentHTML("beforeend", countryListTemplate);

        this.initData();
        Keyboard.init();
    }

    initData() {
        this.service.getFullInformationCountry().then((data) => {
            this.dataFullCountry = data;
            this.data = data;
            this.renderAndListen();
        });
    }

    async renderAndListen() {
        await this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        // custom event
        const countryList = document.querySelector(".country-list-switch-wrapper");
        const listWrapper = document.querySelector(".country-list-countries-wrapper");
        createGlobalClick(countryList);
        clickChooseCountry(listWrapper);
    }

    render() {
        this.chart.init(this.data);

        setInterval(() => this.chart.search(), 1000);
        const keyboardButton = document.querySelector(".country-list-keyboard");

        keyboardButton.addEventListener("click", () => {
            document.querySelector(".keyboard--hidden") ? Keyboard.show() : Keyboard.hide();
        });

        this.chart.render(this.data, this.param);
    }

    onSwitchCountryList(switchPos) {
        const countryListWrapper = document.querySelector(".country-list-countries-wrapper");
        countryListWrapper.innerHTML = "";
        let counter = switchPos === "left" ? this.counterSwitch - 1 : this.counterSwitch + 1;

        if (counter > 2) {
            counter = 0;
        } else if (counter < 0) {
            counter = 2;
        }

        switch (counter) {
            case 0:
                this.onChangeParam("Cases", this.paramNewOrTotal);
                this.chart.render(this.data, this.param, this.checkDataPopulations, COLOR_PALETTE.RED);
                break;
            case 1:
                this.onChangeParam("Deaths", this.paramNewOrTotal);
                this.chart.render(this.data, this.param, this.checkDataPopulations, COLOR_PALETTE.GREY);
                break;
            default:
                this.onChangeParam("Recovered", this.paramNewOrTotal);
                this.chart.render(this.data, this.param, this.checkDataPopulations, COLOR_PALETTE.GREEN);
                break;
        }

        this.counterSwitch = counter;
    }

    onRadioClick(paramDate, checkPopulation) {
        const countryListWrapper = document.querySelector(".country-list-countries-wrapper");
        countryListWrapper.innerHTML = "";
        this.counterSwitch = 0;
        this.titleCurrentCategory = "Cases";
        this.paramNewOrTotal = paramDate;
        this.param = `${this.paramNewOrTotal}Cases`;
        this.checkDataPopulations = checkPopulation;
        this.chart.render(this.data, this.param, this.checkDataPopulations, COLOR_PALETTE.RED);
    }

    onChangeParam(title, param) {
        const countrySwitchTitle = document.querySelector(".country-list-swich-title");
        countrySwitchTitle.textContent = title;
        this.titleCurrentCategory = title;
        this.paramNewOrTotal = param;
        this.param = `${this.paramNewOrTotal}${this.titleCurrentCategory}`;
    }

    onChooseCountry(country, checkClick) {
        if (!checkClick) {
            const countryListWrapper = document.querySelector(".country-list-countries-wrapper");
            countryListWrapper.innerHTML = "";
            this.data = this.dataFullCountry.filter((item) => item.countryInfo.iso3 === country);
            this.counterSwitch = 0;
            this.chart.render(this.data, this.param, this.checkDataPopulations, COLOR_PALETTE.RED);
        } else {
            const countryListFullWrapper = document.querySelector(".country-list-wrapper");
            countryListFullWrapper.innerHTML = "";
            this.titleCurrentCategory = "Cases";
            this.paramNewOrTotal = "total";
            this.param = `${this.paramNewOrTotal}${this.titleCurrentCategory}`;
            this.counterSwitch = 0;
            this.checkDataPopulations = false;
            this.initData();
        }
    }
}
