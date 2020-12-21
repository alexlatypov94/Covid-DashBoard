export function legendMap(parent = document.querySelector(".world-map")) {
    const legendBtn = document.createElement("button");
    legendBtn.classList.add("legendBtn");
    legendBtn.innerHTML = `
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
`;

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

    const closeLegend = () => {
        document.querySelector("body").addEventListener(
            "click",
            (e) => {
                const container = document.querySelector(".legendMapContainer");
                if (!e.target.closest(".legendMapContainer ") && container.classList.contains("active")) {
                    legendMapContainer.classList.toggle("active");
                }
            },
            true
        );
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
