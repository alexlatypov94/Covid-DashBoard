import { CovidDashboardService, ONE_HUNDREED, COLOR_PALETTE } from "../../core/index";
import { sortData } from "./utils/index";
import { globalTableTemplate, totalCaseWrapperTemplate, radioButton } from "./global-table.template";

export class GlobalTable {
    constructor() {
        this.service = new CovidDashboardService();
        this.paramNewOrTotal = "total";
        this.param = `${this.paramNewOrTotal}Confirmed`;

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
        this.service.getSummary().then((data) => this.renderAndListen(data));
    }

    async renderAndListen(data, color, population) {
        await this.render(data, color, population);
        this.addEventListeners(data);
    }

    render(data, color, population) {
        const globalTable = document.querySelector(".global-table");
        const categoryName = `Global ${this.titleCurrentCategory}`;
        const tableName = `Global ${this.titleCurrentCategory}`;
        const globalAmount = data?.global?.[this.param];

        globalTable.innerHTML = "";
        globalTable.insertAdjacentHTML(
            "beforeend",
            globalTableTemplate(categoryName, tableName, globalAmount, color || this.totalConfirmed)
        );

        const dataWrapper = document.querySelector(".total-case-wrapper");

        sortData(data?.countries, this.param)?.forEach((element) => {
            let checkPopulations = 0;
            population?.forEach((el) => {
                if (element.country === el.name) {
                    checkPopulations = ((element[this.param] / el.population) * ONE_HUNDREED).toFixed(3);
                }
            });

            dataWrapper.insertAdjacentHTML(
                "beforeend",
                totalCaseWrapperTemplate(
                    color || this.totalConfirmed,
                    checkPopulations || element?.[this.param],
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
                this.service
                    .getFlagsAndPopulations()
                    .then((dataPopulations) =>
                        isSwithOnStatistics
                            ? this.onSwithStatistics(event, data, amount, dataPopulations)
                            : this.onRadioButtonClick(event, data, amount, dataPopulations)
                    );
            }
        });
    }

    onSwithStatistics(event, data, amount, populations) {
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
                this.param = `${this.paramNewOrTotal}Confirmed`;
                this.titleForCases = "case";
                this.checkDataPopulations
                    ? this.renderAndListen(data, this.totalConfirmed, populations)
                    : this.renderAndListen(data, this.totalConfirmed);
                break;
            case 1:
                newAmount.style.color = COLOR_PALETTE.GREY;
                this.titleCurrentCategory = "death";
                this.param = `${this.paramNewOrTotal}Deaths`;
                this.titleForCases = "death";
                this.checkDataPopulations
                    ? this.renderAndListen(data, this.totalDeath, populations)
                    : this.renderAndListen(data, this.totalDeath);
                break;
            default:
                newAmount.style.color = COLOR_PALETTE.GREEN;
                this.titleCurrentCategory = "recovered";
                this.titleForCases = "recovered";
                this.param = `${this.paramNewOrTotal}Recovered`;
                this.checkDataPopulations
                    ? this.renderAndListen(data, this.totalRecovered, populations)
                    : this.renderAndListen(data, this.totalRecovered);
                break;
        }

        this.counterForSwitch = counter;
    }

    onRadioButtonClick(event, data, amount, populations) {
        const newAmount = amount;
        const dataAttribute = event.target.getAttribute("data-attribute");
        newAmount.style.color = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;
        this.titleForCases = "cases";
        this.titleCurrentCategory = "cases";

        switch (dataAttribute) {
            case "total":
                this.paramNewOrTotal = "total";
                this.param = `${this.paramNewOrTotal}Confirmed`;
                this.checkDataPopulations === false
                    ? this.checkDataPopulations
                    : (this.checkDataPopulations = !this.checkDataPopulations);
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case "new":
                this.paramNewOrTotal = "new";
                this.param = `${this.paramNewOrTotal}Confirmed`;
                this.checkDataPopulations === false
                    ? this.checkDataPopulations
                    : (this.checkDataPopulations = !this.checkDataPopulations);
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case "General-hundreed":
                this.paramNewOrTotal = "total";
                this.param = `${this.paramNewOrTotal}Confirmed`;
                this.checkDataPopulations === false
                    ? (this.checkDataPopulations = !this.checkDataPopulations)
                    : this.checkDataPopulations;
                // this.checkDataPopulations = !this.checkDataPopulations;
                this.renderAndListen(data, this.totalConfirmed, populations);
                break;
            default:
                this.paramNewOrTotal = "new";
                this.param = `${this.paramNewOrTotal}Confirmed`;
                this.checkDataPopulations === false
                    ? (this.checkDataPopulations = !this.checkDataPopulations)
                    : this.checkDataPopulations;
                // this.checkDataPopulations = !this.checkDataPopulations;
                this.renderAndListen(data, this.totalConfirmed, populations);
                break;
        }
    }
}
