import { CovidDashboardService, COLOR_PALETTE } from "../../core/index";
import { sortData, updateDataForHundreed } from "./utils/index";
import { globalTableTemplate, totalCaseWrapperTemplate, radioButton } from "./global-table.template";

export class GlobalTable {
    constructor() {
        this.service = new CovidDashboardService();
        this.paramNewOrTotal = "total";
        this.param = `${this.paramNewOrTotal}Cases`;

        this.totalConfirmed = "item-confirmed-color";
        this.totalDeath = "item-death-color";
        this.totalRecovered = "item-recovered-color";

        this.counterForSwitch = 0;
        this.titleForCases = "cases";
        this.titleCurrentCategory = "cases";

        this.checkDataPopulations = false;
    }

    init() {
        const table = document.querySelector(".table");
        table.insertAdjacentHTML("beforeend", radioButton);

        this.service.getFullInformationCounty().then((data) => this.renderAndListen(data));
    }

    async renderAndListen(data, color) {
        await this.render(data, color);
        this.addEventListeners(data);
    }

    render(data, color) {
        let sortObject = [];

        const sortOfPopulation = updateDataForHundreed(data, this.param);

        !this.checkDataPopulations
            ? (sortObject = sortData(data, this.param))
            : (sortObject = sortData(sortOfPopulation, this.param));

        const globalTable = document.querySelector(".global-table");
        const categoryName = `Global ${this.titleCurrentCategory}`;
        const tableName = `Global ${this.titleCurrentCategory}`;
        const globalAmount = +sortObject.reduce((acc, curr) => acc + curr[this.param], 0).toFixed(3);

        globalTable.innerHTML = "";
        globalTable.insertAdjacentHTML(
            "beforeend",
            globalTableTemplate(categoryName, tableName, globalAmount, color || this.totalConfirmed)
        );

        const dataWrapper = document.querySelector(".total-case-wrapper");

        sortObject.forEach((element) => {
            dataWrapper.insertAdjacentHTML(
                "beforeend",
                totalCaseWrapperTemplate(
                    color || this.totalConfirmed,
                    element?.[this.param],
                    this.titleForCases,
                    element?.country
                )
            );
        });

        return data;
    }

    addEventListeners(data) {
        const table = document.querySelector(".table");
        const amount = document.querySelector(".amount-global-case");

        table.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const isSwithOnStatistics = event.target.closest(".btn-changes") !== null;
            const isRadioButtonClick = event.target.closest("label") !== null;

            if (isSwithOnStatistics || isRadioButtonClick) {
                isSwithOnStatistics
                    ? this.onSwithStatistics(event, data, amount)
                    : this.onRadioButtonClick(event, data, amount);
            }
        });
    }

    onSwithStatistics(event, data, amount) {
        const newAmount = amount;
        let counter;

        event.target.closest(".left-change")
            ? (counter = this.counterForSwitch - 1)
            : (counter = this.counterForSwitch + 1);

        if (counter > 2) {
            counter = 0;
        } else if (counter < 0) {
            counter = 2;
        }

        switch (counter) {
            case 0:
                newAmount.style.color = COLOR_PALETTE.RED;
                this.titleCurrentCategory = "cases";
                this.param = `${this.paramNewOrTotal}Cases`;
                this.titleForCases = "case";
                this.checkDataPopulations
                    ? this.renderAndListen(data, this.totalConfirmed)
                    : this.renderAndListen(data, this.totalConfirmed);
                break;
            case 1:
                newAmount.style.color = COLOR_PALETTE.GREY;
                this.titleCurrentCategory = "death";
                this.param = `${this.paramNewOrTotal}Deaths`;
                this.titleForCases = "death";
                this.checkDataPopulations
                    ? this.renderAndListen(data, this.totalDeath)
                    : this.renderAndListen(data, this.totalDeath);
                break;
            default:
                newAmount.style.color = COLOR_PALETTE.GREEN;
                this.titleCurrentCategory = "recovered";
                this.titleForCases = "recovered";
                this.param = `${this.paramNewOrTotal}Recovered`;
                this.checkDataPopulations
                    ? this.renderAndListen(data, this.totalRecovered)
                    : this.renderAndListen(data, this.totalRecovered);
                break;
        }

        this.counterForSwitch = counter;
    }

    onRadioButtonClick(event, data, amount) {
        const newAmount = amount;
        const dataAttribute = event.target.getAttribute("data-attribute");
        newAmount.style.color = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;
        this.titleForCases = "cases";
        this.titleCurrentCategory = "cases";

        switch (dataAttribute) {
            case "total":
                this.paramNewOrTotal = "total";
                this.param = `${this.paramNewOrTotal}Cases`;
                this.checkDataPopulations === false
                    ? this.checkDataPopulations
                    : (this.checkDataPopulations = !this.checkDataPopulations);
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case "new":
                this.paramNewOrTotal = "today";
                this.param = `${this.paramNewOrTotal}Cases`;
                this.checkDataPopulations === false
                    ? this.checkDataPopulations
                    : (this.checkDataPopulations = !this.checkDataPopulations);
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case "General-hundreed":
                this.paramNewOrTotal = "total";
                this.param = `${this.paramNewOrTotal}Cases`;
                this.checkDataPopulations === false
                    ? (this.checkDataPopulations = !this.checkDataPopulations)
                    : this.checkDataPopulations;
                this.renderAndListen(data, this.totalConfirmed);
                break;
            default:
                this.paramNewOrTotal = "today";
                this.param = `${this.paramNewOrTotal}Cases`;
                this.checkDataPopulations === false
                    ? (this.checkDataPopulations = !this.checkDataPopulations)
                    : this.checkDataPopulations;
                this.renderAndListen(data, this.totalConfirmed);
                break;
        }
    }
}
