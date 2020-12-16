import { graphWrapperCanvas, canvasBoard } from "./graph.template";
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

        this.configForGraph = "Cumulative";
    }

    initGraph() {
        const graphWrapper = document.querySelector(".graph");
        graphWrapper.insertAdjacentHTML("beforeend", graphWrapperCanvas);
        this.service.getApiGlobalForGraph().then((data) => this.renderAndListen(data));
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
            // const myChart = new Chart(graphCanvas, {
            //     type: "line",
            //     data: {
            //         labels: getKeys(data[this.keyObj]),
            //         datasets: [
            //             {
            //                 label: this.label,
            //                 data: getValueCumulative(data[this.keyObj]),
            //                 backgroundColor: [this.backgroundColor],
            //                 borderColor: [this.borderColor],
            //                 borderWidth: 1
            //             }
            //         ]
            //     },
            //     options: {
            //         legend: {
            //             fontSize: 30,
            //             labels: {
            //                 fontSize: 24
            //             }
            //         },
            //         scales: {
            //             yAxes: [
            //                 {
            //                     ticks: {
            //                         beginAtZero: true,
            //                         maxTicksLimit: 5,
            //                         fontSize: 20,

            //                         "callback": function (value) {
            //                             const newValue = value.toString().length > 5 ? `${value / 1000000}M` : value;

            //                             return newValue;
            //                         }
            //                     },
            //                     position: "right"
            //                 }
            //             ],

            //             xAxes: [
            //                 {
            //                     ticks: {
            //                         maxTicksLimit: 11,
            //                         fontSize: 20,
            //                         "callback": function (value) {
            //                             const month = [
            //                                 "Jan",
            //                                 "Feb",
            //                                 "Mar",
            //                                 "Apr",
            //                                 "May",
            //                                 "June",
            //                                 "July",
            //                                 "Aug",
            //                                 "Sep",
            //                                 "Oct",
            //                                 "Nov",
            //                                 "Dec"
            //                             ];
            //                             const newValue = value.split("/");
            //                             const valueMonth = newValue.splice(0, 1).join("");
            //                             const changedNameTicks = month[valueMonth - 1];
            //                             return changedNameTicks;
            //                         }
            //                     }
            //                 }
            //             ]
            //         }
            //     }
            // });
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
        graphWrapper.addEventListener("click", (event) => {
            if (event.target.closest(".draw-graph-switch")) {
                wrapperCanvasForRemove.innerHTML = "";
                this.onSwitchGraph(event, data);
            }
            event.stopImmediatePropagation();
        });

        graphCanvas.removeAttribute("style", "width", "height");
    }

    onSwitchGraph(event, data) {
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
                this.renderAndListen(data);
                break;
            case 1:
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.GREY, "Deaths", "totalDeaths");
                this.renderAndListen(data);
                break;
            default:
                this.onChangeParametersSwitchGraph(COLOR_PALETTE.GREEN, "Recovered", "totalRecovered");
                this.renderAndListen(data);
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
}
