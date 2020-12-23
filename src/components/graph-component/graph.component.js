import { graphWrapperCanvas, canvasBoard, toggleForGraph, selectOptions } from "./graph.template";
import { CovidDashboardService } from "../../core/services/index";
import { getValueCumulative, getKeys, getValueDays, initGraphType } from "./util/index";
import { COLOR_PALETTE } from "../../core/index";
import { createGlobalClick, createChangeSelectGraph, createChangeSelectCountry } from "../util/index";

export class DrawGraph {
    constructor() {
        this.service = new CovidDashboardService();
        this.label = "Cases";
        this.keyObj = "totalCases";
        this.backgroundColor = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;

        this.dataFullCountry = undefined;

        this.configForGraph = "Cumulative";
        this.globalOrCountry = false;
        /* this variables to init common logic */
        this.chooseCountry = "";
        this.populationDivision = false;
        this.population = 0;

        this.btnClick = false;
        this.data = undefined;
    }

    init() {
        const graphWrapper = document.querySelector(".graph");
        graphWrapper.insertAdjacentHTML("beforeend", graphWrapperCanvas);
        graphWrapper.insertAdjacentHTML("beforeend", toggleForGraph);
        this.initData();
    }

    initData() {
        this.service.getFullInformationCountry().then((dataCountry) => {
            this.dataFullCountry = dataCountry;

            this.addSelectItems();
            this.chooseApi();
        });
    }

    chooseApi() {
        !this.globalOrCountry
            ? this.service.getApiGlobalForGraph().then((data) => {
                  this.data = data;
                  this.renderAndListen();
              })
            : this.service.getFullInformationChooseCountry(this.chooseCountry).then((data) => {
                  this.data = data;
                  this.renderAndListen();
              });
    }

    async renderAndListen() {
        await this.render();
        this.addEventListeners();
    }

    render() {
        const canvasWrapper = document.querySelector(".graph-wrapper-canvas");
        canvasWrapper.innerHTML = "";
        canvasWrapper.insertAdjacentHTML("beforeend", canvasBoard);
        const graphCanvas = document.querySelector(".canvas-board").getContext("2d");
        const labels = getKeys(this.data, this.keyObj);

        if (labels[0] === "error") {
            this.label = "Data is no founded";
        }

        this.population = this.dataFullCountry?.reduce((acc, curr) => acc + curr.population, 0);

        if (this.configForGraph === "Cumulative" || this.configForGraph === "Cumulative/100") {
            const dataObject = !this.populationDivision
                ? getValueCumulative(this.data?.[this.keyObj])
                : getValueCumulative(this.data?.[this.keyObj], this.population);

            initGraphType(graphCanvas, "line", labels, dataObject, this.backgroundColor, this.label);
        }

        if (this.configForGraph === "Day" || this.configForGraph === "Day/100") {
            const dataObject = !this.populationDivision
                ? getValueDays(this.data?.[this.keyObj])
                : getValueDays(this.data?.[this.keyObj], this.population);

            initGraphType(graphCanvas, "bar", labels, dataObject, this.backgroundColor, this.label);
        }
    }

    addEventListeners() {
        const graphWrapper = document.querySelector(".graph");
        const selectGlobalParam = document.querySelector(".draw-graph-select");
        const selectForCountry = document.querySelector(".draw-graph-select-country");

        // custom event
        createChangeSelectGraph(selectGlobalParam);
        createChangeSelectCountry(selectForCountry, this.dataFullCountry);
        createGlobalClick(graphWrapper);
    }

    onSwitchGraph(switchPos) {
        let counter = switchPos === "left" ? this.counterForSwitch - 1 : this.counterForSwitch + 1;

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

    onRadioClick(config, checkPopulation) {
        const wrapperCanvasForRemove = document.querySelector(".graph-wrapper-canvas");
        wrapperCanvasForRemove.innerHTML = "";
        this.configForGraph = config;
        this.populationDivision = checkPopulation;
        this.label = "Cases";
        this.keyObj = "totalCases";
        this.backgroundColor = COLOR_PALETTE.RED;
        this.counterForSwitch = 0;
        this.renderAndListen();
    }

    addSelectItems() {
        const selectCountry = document.querySelector(".draw-graph-select-country");
        this.dataFullCountry.forEach((el) => {
            selectCountry.insertAdjacentHTML("beforeend", selectOptions(el.country, el.countryInfo.iso3));
        });
    }

    onChooseCountry(country, checkClick) {
        if (!checkClick && country !== "All world") {
            this.chooseCountry = this.dataFullCountry?.filter((item) => item?.countryInfo?.iso3 === country)[0]
                ?.country || [{ error: "error" }];
            this.globalOrCountry = true;
            this.label = "Cases";
            this.keyObj = "totalCases";
            this.backgroundColor = COLOR_PALETTE.RED;
            this.counterForSwitch = 0;
            this.chooseApi();
        } else {
            this.globalOrCountry = false;
            this.label = "Cases";
            this.keyObj = "totalCases";
            this.backgroundColor = COLOR_PALETTE.RED;
            this.counterForSwitch = 0;
            this.initData();
        }
    }
}
