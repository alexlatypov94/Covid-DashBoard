import { globalTableTemplate } from "./global-table.template";
import { CovidDashboardService } from "../../core/index";
import { ONE_HUNDREED } from "../../core/constants";

export class GlobalTable {
    constructor() {
        this.service = new CovidDashboardService();
        this.paramNewOrTotal = "total";
        this.param = `${this.paramNewOrTotal}Confirmed`;

        this.totalConfirmed = "item-confirmed-color";
        this.totalDeath = "item-death-color";
        this.totalRecovered = "item-recovered-color";

        this.titleForCases = "cases";
        this.titleCurrentCategory = "cases";

        this.counterForSwitch = 0;

        this.checkDataPopulations = false;
    }

    init() {
        this.service.getSummary().then((data) => this.initTableInfo(data, this.totalConfirmed));
        this.render();
    }

    render() {
        const table = document.querySelector(".table");
        table.insertAdjacentHTML("beforeend", globalTableTemplate);
    }

    initTableInfo(data, colorForTotal, dataPopulation) {
        const titleCurrentCategory = document.querySelector(".title-current-category");
        const globalTitleTable = document.querySelector(".global-table-title");
        const amountGlobalCase = document.querySelector(".amount-global-case");
        const dataWrapper = document.querySelector(".total-case-wrapper");
        const globalTableWrapper = document.querySelector(".global-table");
        const sortedData = data.countries.sort((a, b) => (a[this.param] > b[this.param] ? -1 : 1));

        titleCurrentCategory.innerText = `Global ${this.titleCurrentCategory}`;
        globalTitleTable.innerText = `Global ${this.titleCurrentCategory}`;
        amountGlobalCase.innerText = data.global[this.param];
       
        sortedData.forEach((element) => {
            let checkPopulations = 0;
            if(dataPopulation) {
                dataPopulation.forEach((el) => {
                    if(element.country === el.name) {
                        checkPopulations = element[this.param] / el.population * ONE_HUNDREED
                    }
                })
            }
            
            dataWrapper.insertAdjacentHTML(
                "beforeend",
                `
            <div class = "table-item">
                <div class = "${colorForTotal}"><span class = "total-number">${checkPopulations || element[this.param]}</span> ${
                    this.titleForCases
                }</div>
                <span class = "country-style">${element.country}</span>
            </div>
        `
            );
        });

        globalTableWrapper.addEventListener("click", (event) => {
            if (event.target.closest(".btn-changes")) {
                event.stopImmediatePropagation();
                dataWrapper.innerHTML = "";
                
                this.service
                .getFlagsAndPopulations()
                .then((dataPopulations) => this.onSwithStatistics(event, data, amountGlobalCase, dataPopulations));
            }

            if (event.target.closest("label")) {
                event.stopImmediatePropagation();
                dataWrapper.innerHTML = "";
                this.service
                    .getFlagsAndPopulations()
                    .then((dataPopulations) => this.onRadioButtonClick(event, data, amountGlobalCase, dataPopulations));
            }
        });
    }

    onSwithStatistics(event, data, amountGlobalCase, dataPopulations) {
        const newAmountGlobalCase = amountGlobalCase;
        event.target.closest(".left-change") ? (this.counterForSwitch -= 1) : (this.counterForSwitch += 1);

        if (this.counterForSwitch > 2) {
            this.counterForSwitch = 0;
        }
        if (this.counterForSwitch < 0) {
            this.counterForSwitch = 2;
        }

        if (this.counterForSwitch === 0) {
            newAmountGlobalCase.style.color = "#f00b0b";
            this.titleCurrentCategory = "cases";
            this.param = `${this.paramNewOrTotal}Confirmed`;
            this.titleForCases = "case";
            this.checkDataPopulations ? this.initTableInfo(data, this.totalConfirmed, dataPopulations) : this.initTableInfo(data, this.totalConfirmed);
        } else if (this.counterForSwitch === 1) {
            newAmountGlobalCase.style.color = "#9698a8";
            this.titleCurrentCategory = "death";
            this.param = `${this.paramNewOrTotal}Deaths`;
            this.titleForCases = "death";
            this.checkDataPopulations ? this.initTableInfo(data, this.totalDeath, dataPopulations) : this.initTableInfo(data, this.totalDeath);
        } else {
            newAmountGlobalCase.style.color = "#0bf03d";
            this.titleCurrentCategory = "recovered";
            this.titleForCases = "recovered";
            this.param = `${this.paramNewOrTotal}Recovered`;
            this.checkDataPopulations ? this.initTableInfo(data, this.totalRecovered, dataPopulations) : this.initTableInfo(data, this.totalRecovered);
        }
    }

    onRadioButtonClick(event, data, amountGlobalCase, dataPopulations) {
        const newAmountGlobalCase = amountGlobalCase;
        newAmountGlobalCase.style.color = "#f00b0b";
        this.counterForSwitch = 0;
        this.titleForCases = "cases";
        this.titleCurrentCategory = "cases";
        if (event.target.getAttribute("data-attribute") === "total") {
            this.paramNewOrTotal = "total";
            this.param = `${this.paramNewOrTotal}Confirmed`;
            this.initTableInfo(data, this.totalConfirmed);
        } else if (event.target.getAttribute("data-attribute") === "new") {
            this.paramNewOrTotal = "new";
            this.param = `${this.paramNewOrTotal}Confirmed`;
            this.initTableInfo(data, this.totalConfirmed);
        } else if (event.target.getAttribute("data-attribute") === "General-hundreed") {
            this.paramNewOrTotal = "total";
            this.param = `${this.paramNewOrTotal}Confirmed`;
            this.checkDataPopulations = !this.checkDataPopulations
            this.initTableInfo(data, this.totalConfirmed, dataPopulations);
        } else {
            this.paramNewOrTotal = "new";
            this.param = `${this.paramNewOrTotal}Confirmed`;
            this.checkDataPopulations = !this.checkDataPopulations
            this.initTableInfo(data, this.totalConfirmed, dataPopulations);
        }
    }
}
