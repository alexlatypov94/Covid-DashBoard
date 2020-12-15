import { CovidDashboardService, COLOR_PALETTE } from "../../core/index";
import { sortData, updateDataForHundreed } from "./utils/index";
import { globalTableTemplate, totalCaseWrapperTemplate, radioButton } from "./global-table.template";

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
    }

    init() {
        const table = document.querySelector(".table");
        table.insertAdjacentHTML("beforeend", radioButton);

        this.service.getFullInformationCountry().then((data) => this.renderAndListen(data));
    }

    async renderAndListen(data, color) {
        await this.render(data, color);
        this.addEventListeners(data);
    }

    render(data, color) {
        const sortOfPopulation = updateDataForHundreed(data, this.param);
        const sortObject = !this.checkDataPopulations
            ? sortData(data, this.param)
            : sortData(sortOfPopulation, this.param);

        const globalTable = document.querySelector(".global-table");
        const categoryName = `Global ${this.titleCurrentCategory}`;
        const tableName = `Global ${this.titleCurrentCategory}`;
        const globalAmount = Number(sortObject.reduce((acc, curr) => acc + curr[this.param], 0).toFixed(3));

        globalTable.innerHTML = "";
        globalTable.insertAdjacentHTML(
            "beforeend",
            globalTableTemplate(categoryName, tableName, globalAmount, color || this.totalConfirmed)
        );

        const dataWrapper = document.querySelector(".global-table-total-case-wrapper");

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
        const amount = document.querySelector(".global-table-amount-global-case");

        table.addEventListener("click", (event) => {
            event.stopImmediatePropagation();

            const isSwithOnStatistics = event.target.closest(".global-table-btn-changes") !== null;
            const isRadioButtonClick = event.target.closest("label") !== null;

            if (isSwithOnStatistics || isRadioButtonClick) {
                isSwithOnStatistics
                    ? this.onSwithStatistics(event, data, amount)
                    : this.onRadioButtonClick(event, data, amount);
            }
        });
    }

    onSwithStatistics(event, data, amount) {
        let counter = event.target.closest(".left-change")
            ? this.counterForSwitch - 1
            : this.counterForSwitch + 1;

        /* The switch button has three positions:
            1. 0 this is Cases position
            2. 1 this is Deaths position
            3. 2 this is Recovered position */

        if (counter > 2) {
            counter = 0;
        } else if (counter < 0) {
            counter = 2;
        }

        switch (counter) {
            case 0:
                this.onChangeParametersSwitch(COLOR_PALETTE.RED, "Cases", amount);
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case 1:
                this.onChangeParametersSwitch(COLOR_PALETTE.GREY, "Deaths", amount);
                this.renderAndListen(data, this.totalDeath);
                break;
            default:
                this.onChangeParametersSwitch(COLOR_PALETTE.GREEN, "Recovered", amount);
                this.renderAndListen(data, this.totalRecovered);
                break;
        }

        this.counterForSwitch = counter;
    }

    onRadioButtonClick(event, data, amount) {
        const newAmount = amount;
        const dataAttribute = event.target.getAttribute("data-attribute");
        newAmount.style.color = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;
        this.titleForCases = "Cases";
        this.titleCurrentCategory = "Cases";

        switch (dataAttribute) {
            case "total":
                this.onChangeParametersRadio("total");
                this.checkDataPopulations = false;
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case "new":
                this.onChangeParametersRadio("today");
                this.checkDataPopulations = false;
                this.renderAndListen(data, this.totalConfirmed);
                break;
            case "general-hundreed":
                this.onChangeParametersRadio("total");
                this.checkDataPopulations = true;
                this.renderAndListen(data, this.totalConfirmed);
                break;
            default:
                this.onChangeParametersRadio("today");
                this.checkDataPopulations = true;
                this.renderAndListen(data, this.totalConfirmed);
                break;
        }
    }

    onChangeParametersRadio(paramDate) {
        this.paramNewOrTotal = paramDate;
        this.param = `${this.paramNewOrTotal}Cases`;
    }

    onChangeParametersSwitch(colorTitle, wordCategory, amount) {
        const newAmount = amount;
        newAmount.style.color = colorTitle;
        this.titleCurrentCategory = wordCategory;
        this.param = `${this.paramNewOrTotal}${wordCategory}`;
        this.titleForCases = wordCategory;
    }
}
