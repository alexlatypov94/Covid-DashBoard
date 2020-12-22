export function legendMap(parent = document.querySelector(".world-map")) {
    const legendBtn = document.createElement("button");
    legendBtn.classList.add("legendBtn");
    legendBtn.innerHTML = '<div class="dot"></div>'.repeat(9);

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

    const close = (e) => {
        if (
            !e.target.closest(".legendMapContainer") &&
            !e.target.closest(".legendBtn") &&
            legendMapContainer.classList.contains("active")
        ) {
            legendMapContainer.classList.remove("active");
            legendBtn.classList.remove("clicked");
            document.querySelector("body").removeEventListener("click", close);
        }
    };

    const closeLegend = () => {
        document.querySelector("body").addEventListener("click", close);
    };

    legendBtn.addEventListener("click", () => {
        legendMapContainer.classList.toggle("active");
        legendBtn.classList.toggle("clicked");
        closeLegend();
    });

    legendMapContainer.insertAdjacentHTML("beforeend", legendList);

    parent.append(legendBtn);
    parent.append(legendMapContainer);
}
