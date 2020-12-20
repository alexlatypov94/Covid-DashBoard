function checkPopulation(value) {
    if (value !== "Cumulative" && value !== "Day") {
        return true;
    }

    return false;
}

export function createChangeSelectGraph(element, data) {
    const event = new CustomEvent("clickChangeSelectGlobal", {
        detail: { valueChangeForGraph: undefined, valueChangeForTable: undefined, checkPopulation: undefined, country: undefined},
        bubbles: true,
        cancelable: true
    });

    element.addEventListener("click", (e) => {
        const selectChange = e.target.value;
        if (!selectChange) {
            return;
        }
       
        const valueForGraph = selectChange === "Cumulative/100" || selectChange === "Cumulative" ? "total" : "today"
        event.detail.country = data.filter((item) => item?.country === e.target.value)[0]?.countryInfo?.iso3 || "All world"
        console.log(event.detail.country)
        event.detail.valueChangeForGraph = selectChange
        event.detail.valueChangeForTable = valueForGraph
        event.detail.checkPopulation = checkPopulation(selectChange)
        element.dispatchEvent(event);
        e.stopImmediatePropagation();
    });
}