import { CovidDashboardService, COLOR_PALETTE } from "../../core/index";
import { sortData, updateDataForHundreed, getGlobalDivision } from "./utils/index";
import { globalTableTemplate, totalCaseWrapperTemplate, radioButton } from "./global-table.template";
import { createGlobalClick, createClickRadio, clickChooseCountry } from "../util/index";

export class GlobalTable {
    constructor() {
        this.service = new CovidDashboardService();
        this.paramNewOrTotal = "total";
        this.param = `${this.paramNewOrTotal}Cases`;

        this.totalConfirmed = "global-table-item-confirmed-color";
        this.totalDeath = "global-table-item-death-color";
        this.totalRecovered = "global-table-item-recovered-color";

        this.counterForSwitch = 0;
        this.titleForCases = "Cases";
        this.titleCurrentCategory = "Cases";

        this.checkDataPopulations = false;
        this.amount = undefined;
        this.dataFullCountry = undefined;
        this.data = undefined;
    }

    init() {
        const table = document.querySelector(".table");
        table.insertAdjacentHTML("beforeend", radioButton);
        this.initData();
    }

    initData() {
        this.service.getFullInformationCountry().then((data) => {
            this.dataFullCountry = data;
            this.data = data;
            this.renderAndListen();
        });
    }

    async renderAndListen(color) {
        await this.render(color);
        this.addEventListeners();
    }

    render(color) {
        const sortOfPopulation = updateDataForHundreed(this.data, this.param);
        const sortObject = !this.checkDataPopulations
            ? sortData(this.data, this.param)
            : sortData(sortOfPopulation, this.param);

        const globalTable = document.querySelector(".global-table");
        const categoryName = `Global ${this.titleCurrentCategory}`;
        const tableName = `Global ${this.titleCurrentCategory}`;
        const globalAmount = !this.checkDataPopulations
            ? Number(sortObject.reduce((acc, curr) => acc + curr[this.param], 0).toFixed(3))
            : getGlobalDivision(this.data, this.param);

        globalTable.innerHTML = "";
        globalTable.insertAdjacentHTML(
            "beforeend",
            globalTableTemplate(categoryName, tableName, globalAmount, color || this.totalConfirmed)
        );

        const dataWrapper = document.querySelector(".global-table-total-case-wrapper");

        sortObject?.forEach((element) => {
            dataWrapper.insertAdjacentHTML(
                "beforeend",
                totalCaseWrapperTemplate(
                    color || this.totalConfirmed,
                    element?.[this.param],
                    this.titleForCases,
                    element?.country,
                    element?.countryInfo?.iso3
                )
            );
        });

        this.amount = document.querySelector(".global-table-amount-global-case");
    }

    addEventListeners() {
        const globalTableSwtichs = document.querySelector(".global-table-switch-wrapper");
        const radioWrapper = document.querySelector(".global-table-checkbox-wrapper");
        const tableWrapper = document.querySelector(".global-table-total-case-wrapper");
        createClickRadio(radioWrapper);
        createGlobalClick(globalTableSwtichs);
        clickChooseCountry(tableWrapper);
    }

    onSwithStatistics(switchPos) {
        let counter = switchPos === "left" ? this.counterForSwitch - 1 : this.counterForSwitch + 1;

        /**
         * The switch button has three positions:
         *  1. 0 this is Cases position
         *  2. 1 this is Deaths position
         *  3. 2 this is Recovered position
         */

        if (counter > 2) {
            counter = 0;
        } else if (counter < 0) {
            counter = 2;
        }

        switch (counter) {
            case 0:
                this.onChangeParametersSwitch(COLOR_PALETTE.RED, "Cases");
                this.renderAndListen(this.totalConfirmed);
                break;
            case 1:
                this.onChangeParametersSwitch(COLOR_PALETTE.GREY, "Deaths");
                this.renderAndListen(this.totalDeath);
                break;
            default:
                this.onChangeParametersSwitch(COLOR_PALETTE.GREEN, "Recovered");
                this.renderAndListen(this.totalRecovered);
                break;
        }

        this.counterForSwitch = counter;
    }

    onRadioButtonClick(paramDate, checkPopulation) {
        this.amount.style.color = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;
        this.titleForCases = "Cases";
        this.titleCurrentCategory = "Cases";
        this.paramNewOrTotal = paramDate;
        this.param = `${this.paramNewOrTotal}Cases`;
        this.checkDataPopulations = checkPopulation;
        this.renderAndListen(this.totalConfirmed);
    }

    onChangeParametersSwitch(colorTitle, wordCategory) {
        this.amount.style.color = colorTitle;
        this.titleCurrentCategory = wordCategory;
        this.param = `${this.paramNewOrTotal}${wordCategory}`;
        this.titleForCases = wordCategory;
    }

    onChooseCountry(country, checkClick) {
        // console.log(checkClick)
        if (!checkClick) {
            this.data = this.dataFullCountry.filter((item) => item.countryInfo.iso3 === country);
            this.counterForSwitch = 0;
            this.renderAndListen(this.totalConfirmed);
        } else {
            this.paramNewOrTotal = "total";
            this.param = `${this.paramNewOrTotal}Cases`;
            this.counterForSwitch = 0;
            this.titleForCases = "Cases";
            this.titleCurrentCategory = "Cases";
            this.checkDataPopulations = false;
            this.initData();
        }
    }
}
