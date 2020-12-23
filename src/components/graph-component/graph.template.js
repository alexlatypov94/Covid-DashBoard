import "./graph.scss";

export const graphWrapperCanvas = `
    <div class = "graph-wrapper-canvas"></div>
`;

export const canvasBoard = `
        <canvas class = "canvas-board"></canvas>
`;

export const toggleForGraph = `
    <button class = "draw-graph-switch draw-graph-left arrow-btn">
    <svg class = "draw-graph-switch draw-graph-left svg-arrow" width="18px" height="27px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
        <polygon class="arrow-6-pl"
            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
        </polygon>
        <polygon class="arrow-6-pl-fixed"
            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
        </polygon>
        <path
            d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z">
        </path>
        </g>
    </svg>
    </button>
    <select class = "draw-graph-select-country">
        <option class = "draw-graph-choose-county">All world</option>
    </select>
    <div class = "draw-graph-left-select-btn">
    <select class = "draw-graph-select">
        <option class = "draw-graph-general">Cumulative</option>
        <option class = "draw-graph-general">Day</option>
        <option class = "draw-graph-general">Cumulative/100</option>
        <option class = "draw-graph-general">Day/100</option>
    </select>
    </div>
    
    <button class = "draw-graph-switch draw-graph-right arrow-btn">
    <svg class = "draw-graph-switch draw-graph-right svg-arrow" width="18px" height="17px" viewBox="-1 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
        <polygon class="arrow-6-pl"
            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
        </polygon>
        <polygon class="arrow-6-pl-fixed"
            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
        </polygon>
        <path
            d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z">
        </path>
        </g>
    </svg>
    </button>
`;

export const selectOptions = (countryOption, dataOption) => {
    return ` <option class = "draw-graph-choose-county" data-country = "${dataOption}">${countryOption}</option>`;
};
