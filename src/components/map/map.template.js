export function mapComponent(parent) {
    const element = document.createElement("div");
    element.setAttribute("id", "map");

    const mapButtons = `
    <ul class="mapButtons">
        <li><button class="mapButtons__item" data-value="cases">Cumulative Cases</button></li>
        <li><button class="mapButtons__item" data-value="active">Active Cases</button></li>
        <li><button class="mapButtons__item" data-value="recovered">Recovered</button></li>
        <li><button class="mapButtons__item" data-value="death">Death</button></li>
    </ul>`;
    parent.insertAdjacentHTML("beforeend", mapButtons);
    return parent.append(element);
}
