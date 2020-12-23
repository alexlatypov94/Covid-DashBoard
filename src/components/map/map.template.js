import "./map.scss";

export function mapComponent(parent) {
    const element = document.createElement("div");
    element.setAttribute("id", "map");

    const mapButtons = `
    <ul class="mapButtons">
        
				<li><button class = "mapButtons__item-left"><</button></li>
				
        <li><button class = "mapButtons__item-right">></button></li>
    </ul>`;
    parent.insertAdjacentHTML("beforeend", mapButtons);
    return parent.append(element);
}
