import { graphWrapperCanvas } from "./graph.template";
import { CovidDashboardService } from "../../core/services/covid-dashboard.service";
import { getValue, getKeys } from "./util/index";
import { Chart } from "chart.js";

export class DrawGraph {
    constructor() {
        this.service = new CovidDashboardService();
        this.keyObj = "totalCases";
        this.label = "Cases";
        this.backgroundColor = "rgba(255, 99, 132, 0.2)";
        this.borderColor = "rgba(255, 99, 132, 1)";
    }

    initGraph() {
        const graphWrapper = document.querySelector(".graph");
        graphWrapper.insertAdjacentHTML("beforeend", graphWrapperCanvas);
        this.service.getApiBlobalForGraph().then((data) => this.renderAndListen(data));
    }

    async renderAndListen(data) {
        console.log(data)
        await this.render(data);
        this.addEventListeners(data);
    }

    render(data) {
        const graphCanvas = document.querySelector(".graph-wrapper").getContext("2d");
        const myChart = new Chart(graphCanvas, {
            type: "line",
            data: {
                labels: getKeys(data[this.keyObj]),
                datasets: [
                    {
                        label: this.label,
                        data: getValue(data[this.keyObj]),
                        backgroundColor: [this.backgroundColor],
                        borderColor: [this.borderColor],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                            position: "right"
                        }
                    ]
                }
            }
        });
    }

    addEventListeners() {
        const graphWrapper = document.querySelector(".graph");
        graphWrapper.addEventListener("click", (event) => {
            if(event.target.closest('.draw-graph-switch')){
                this.onSwitchGraph(event)
            }
        });
    }

    onSwitchGraph(event) { 
        if(event.target.closest('.draw-graph-left')) {
            
        }
        
    }
}
