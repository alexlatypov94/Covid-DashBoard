import "./graph.scss";

export const graphWrapperCanvas = `
    <div class = "graph-wrapper-canvas"></div>
`;

export const canvasBoard = `
        <canvas class = "canvas-board"></canvas>
`;

export const toggleForGraph = `
    <button class = "draw-graph-switch draw-graph-left"><</button>
    <select class = "draw-graph-select-coutry">
        <option class = "draw-graph-choose-county"class = "draw-graph-choose-county">All world</option>
    </select>
    <div class = "draw-graph-left-select-btn">
    <select class = "draw-graph-select">
        <option class = "draw-graph-general">Cumulative</option>
        <option class = "draw-graph-general">Day</option>
    </select>
    </div>
    
    <button class = "draw-graph-switch draw-graph-right">></button>
`;

export const selectOptions = (countryOption, dataOption) => {
    return ` <option class = "draw-graph-choose-county" data-country = "${dataOption}">${countryOption}</option>`;
};
