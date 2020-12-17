import { graphWrapperCanvas, canvasBoard, toggleForGraph, selectOptions } from "./graph.template";
import { CovidDashboardService } from "../../core/services/covid-dashboard.service";
import { getValueCumulative, getKeys, getValueDays, initGraphType } from "./util/index";
import { COLOR_PALETTE } from "../../core/constants";

export class DrawGraph {
    constructor() {
        this.service = new CovidDashboardService();
        this.label = "Cases";
        this.keyObj = "totalCases";
        this.backgroundColor = COLOR_PALETTE.RED;
        this.borderColor = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;

        this.chooseCountry = "";
        this.configForGraph = "Cumulative";
        this.globalOrCountry = false
    }

    initGraph() {
        const graphWrapper = document.querySelector(".graph");
        graphWrapper.insertAdjacentHTML("beforeend", graphWrapperCanvas);
        graphWrapper.insertAdjacentHTML("beforeend", toggleForGraph);
        this.chooseApi()
    }

    chooseApi() {
        this.service.getFullInformationCountry().then((dataCountry) => this.addSelectItems(dataCountry));
        !this.globalOrCountry
            ? this.service.getApiGlobalForGraph().then((data) => this.renderAndListen(data))
            : this.service.getFullInformationChooseCountry(this.chooseCountry)
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
            const dataObject = getValueCumulative(data[this.keyObj]);
            initGraphType(graphCanvas, "line", labels, dataObject, this.backgroundColor, this.borderColor, this.label);
        }

        if (this.configForGraph === "Day") {
            const dataObject = getValueDays(data[this.keyObj]);
            initGraphType(graphCanvas, "bar", labels, dataObject, this.backgroundColor, this.borderColor, this.label);
        }
    }

    addEventListeners(data) {
        const graphWrapper = document.querySelector(".graph");
        const graphCanvas = document.querySelector(".canvas-board");
        const wrapperCanvasForRemove = document.querySelector(".graph-wrapper-canvas");

        graphWrapper.addEventListener("change", (event) => {
            if (event.target.closest(".draw-graph-select")) {
                wrapperCanvasForRemove.innerHTML = "";
                this.configForGraph = event.target.value;
                this.renderAndListen(data);
            }

            if (event.target.closest(".draw-graph-select-coutry")) {
                wrapperCanvasForRemove.innerHTML = "";
                if (event.target.value !== "Choose Country") {
                    this.chooseCountry = event.target.value;
                    this.globalOrCountry = true

                    this.chooseApi()
                }
            }

            event.stopImmediatePropagation();
        });

        graphWrapper.addEventListener("click", (event) => {
            if (event.target.closest(".draw-graph-switch")) {
                wrapperCanvasForRemove.innerHTML = "";
                this.onSwitchGraph(event, data);
            }

            event.stopImmediatePropagation();
        });

        graphCanvas.removeAttribute("style", "width", "height");
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
                this.chooseApi()
                break;
            case 1:
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.GREY, "Deaths", "totalDeaths");
                 this.chooseApi()
                break;
            default:
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.GREEN, "Recovered", "totalRecovered");
                this.chooseApi()
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
        this.countryObj = data;
        const selectCountry = document.querySelector(".draw-graph-select-coutry");
        data.forEach((el) => {
            selectCountry.insertAdjacentHTML("beforeend", selectOptions(el.country, el.countryInfo.iso3));
        });
    }
}

const card = document.querySelectorAll(".card");

card.forEach((item) => {
    item.classList.add(".card-active");
});
