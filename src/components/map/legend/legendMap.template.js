import "./legendMap.scss";

export function legendMap(parent = document.querySelector(".world-map")) {
    const legendBtn = document.createElement("button");
    legendBtn.classList.add("legendBtn");
    legendBtn.innerHTML = "Legend";

    const legendMapContainer = document.createElement("div");
    legendMapContainer.classList.add("legendMapContainer");

    const legendList = `
  <h3 class="legendListTitle">Map Legend</h3>
  <ul>
    <li><span class="legendMapIcon legendMapIcon-red"></span> &gt; 100000</li>
    <li><span class="legendMapIcon legendMapIcon-orange"></span>&gt; 10000</li>
    <li><span class="legendMapIcon legendMapIcon-yellow"></span>&gt; 1000</li>
    <li><span class="legendMapIcon legendMapIcon-blue"></span>&gt; 100</li>
    <li><span class="legendMapIcon legendMapIcon-green"></span>0 - 100</li>
  </ul>
  `;
    legendBtn.addEventListener("click", () => legendMapContainer.classList.toggle("active"));

    legendMapContainer.insertAdjacentHTML("beforeend", legendList);

    parent.append(legendBtn);
    parent.append(legendMapContainer);
}
