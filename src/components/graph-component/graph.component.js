import { graphWrapperCanvas, canvasBoard, toggleForGraph, selectOptions } from "./graph.template";
import { CovidDashboardService } from "../../core/services/covid-dashboard.service";
import { getValueCumulative, getKeys, getValueDays, initGraphType } from "./util/index";
import { COLOR_PALETTE } from "../../core/index";

export class DrawGraph {
    constructor() {
        this.service = new CovidDashboardService();
        this.label = "Cases";
        this.keyObj = "totalCases";
        this.backgroundColor = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;

        this.dataFullCountry = [];

        this.configForGraph = "Cumulative";
        this.globalOrCountry = false;

        /* this variables to init common logic */
        this.chooseCountry = "";
        this.populationDivision = false;
        this.population = 0;

        this.btnClick = false;
    }

    initGraph() {
        const graphWrapper = document.querySelector(".graph");
        graphWrapper.insertAdjacentHTML("beforeend", graphWrapperCanvas);
        graphWrapper.insertAdjacentHTML("beforeend", toggleForGraph);
        this.service.getFullInformationCountry().then((dataCountry) => {
            this.dataFullCountry = dataCountry;
            this.addSelectItems(dataCountry);
            this.chooseApi(dataCountry);
        });
    }

    chooseApi() {
        !this.globalOrCountry
            ? this.service.getApiGlobalForGraph().then((data) => this.renderAndListen(data))
            : this.service
                  .getFullInformationChooseCountry(this.chooseCountry)
                  .then((dataCountry) => this.renderAndListen(dataCountry));
    }

    async renderAndListen(data) {
        await this.render(data);
        this.addEventListeners(data);
    }

    render(data) {
        const canvasWrapper = document.querySelector(".graph-wrapper-canvas");
        canvasWrapper.insertAdjacentHTML("beforeend", canvasBoard);
        const graphCanvas = document.querySelector(".canvas-board").getContext("2d");
        const labels = getKeys(data[this.keyObj]);

        if (this.configForGraph === "Cumulative") {
            this.population = this.dataFullCountry.reduce((acc, curr) => acc + curr.population, 0);

            const dataObject = !this.populationDivision
                ? getValueCumulative(data[this.keyObj])
                : getValueCumulative(data[this.keyObj], this.population);

            initGraphType(graphCanvas, "line", labels, dataObject, this.backgroundColor, this.label);
        }

        if (this.configForGraph === "Day") {
            this.population = this.dataFullCountry.reduce((acc, curr) => acc + curr.population, 0);

            const dataObject = !this.populationDivision
                ? getValueDays(data[this.keyObj])
                : getValueDays(data[this.keyObj], this.population);

            initGraphType(graphCanvas, "bar", labels, dataObject, this.backgroundColor, this.label);
        }
    }

    addEventListeners(data) {
        const graphWrapper = document.querySelector(".graph");
        const graphCanvas = document.querySelector(".canvas-board");
        const wrapperCanvasForRemove = document.querySelector(".graph-wrapper-canvas");
        graphCanvas.removeAttribute("style");

        graphWrapper.addEventListener("change", (event) => {
            if (event.target.closest(".draw-graph-select")) {
                wrapperCanvasForRemove.innerHTML = "";
                this.configForGraph = event.target.value;
                this.chooseApi();
            }

            if (event.target.closest(".draw-graph-select-coutry")) {
                wrapperCanvasForRemove.innerHTML = "";
                if (event.target.value !== "All world") {
                    this.chooseCountry = event.target.value;
                    this.globalOrCountry = true;
                    this.chooseApi();
                } else {
                    this.chooseCountry = event.target.value;
                    this.globalOrCountry = false;
                    this.chooseApi();
                }
            }

            event.stopImmediatePropagation();
        });

        graphWrapper.addEventListener("click", (event) => {
            if (event.target.closest(".draw-graph-switch")) {
                wrapperCanvasForRemove.innerHTML = "";
                this.onSwitchGraph(event, data);
            }

            if (event.target.closest(".base-markup-btn-increase")) {
                !this.btnClick
                    ? graphWrapper.classList.add("full-screen-window")
                    : graphWrapper.classList.remove("full-screen-window");

                this.btnClick = !this.btnClick;
            }

            event.stopImmediatePropagation();
        });
    }

    onSwitchGraph(event) {
        let counter = event.target.closest(".left-change") ? this.counterForSwitch - 1 : this.counterForSwitch + 1;
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
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.RED, "Cases", "totalCases");
                this.chooseApi();
                break;
            case 1:
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.GREY, "Deaths", "totalDeaths");
                this.chooseApi();
                break;
            default:
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.GREEN, "Recovered", "totalRecovered");
                this.chooseApi();
                break;
        }

        this.counterForSwitch = counter;
    }

    onChangeParametersSwitchGraph(color, type, objKey) {
        this.backgroundColor = color;
        this.borderColor = color;
        this.label = type;
        this.keyObj = objKey;
    }

    addSelectItems(data) {
        const selectCountry = document.querySelector(".draw-graph-select-coutry");
        data.forEach((el) => {
            selectCountry.insertAdjacentHTML("beforeend", selectOptions(el.country, el.countryInfo.iso3));
        });
    }
}
