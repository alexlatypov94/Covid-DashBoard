import { Chart } from "chart.js";

export function initGraphType(graphCanvas, typeGraph, labelData, dataArray, bgColor, title) {
    const myChart = new Chart(graphCanvas, {
        type: typeGraph,
        data: {
            labels: labelData,
            datasets: [
                {
                    label: title,
                    data: dataArray,
                    backgroundColor: bgColor,
                    borderColor: "#000000",
                    pointRadius: 1,
                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                labels: {
                    fontSize: 14
                }
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            fontSize: 14,

                            "callback": function (value) {
                                const newValue = value.toString().length > 4 ? `${value / 10e5}M` : value;

                                return newValue;
                            }
                        },
                        position: "right"
                    }
                ],

                xAxes: [
                    {
                        ticks: {
                            maxTicksLimit: 11,
                            fontSize: 14,
                            "callback": function (value) {
                                const month = [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "June",
                                    "July",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec"
                                ];
                                const newValue = value.split("/");
                                const valueMonth = newValue.splice(0, 1).join("");
                                const changedNameTicks = month[valueMonth - 1];
                                return changedNameTicks;
                            }
                        }
                    }
                ]
            }
        }
    });

    return myChart;
}
