function checkPopulation(value) {
    if (value !== "Cumulative" && value !== "Day") {
        return true;
    }

    return false;
}

export function createChangeSelectGraph(element) {
    const event = new CustomEvent("clickChangeSelectGlobal", {
        detail: { valueChangeForGraph: undefined, valueChangeForTable: undefined, checkPopulation: undefined },
        bubbles: true,
        cancelable: true
    });

    element.addEventListener("click", (e) => {
        const selectChange = e.target.value;
        if (!selectChange) {
            return;
        }

        event.detail.country = undefined;
        const valueForGraph = selectChange === "Cumulative/100" || selectChange === "Cumulative" ? "total" : "today";
        event.detail.valueChangeForGraph = selectChange;
        event.detail.valueChangeForTable = valueForGraph;
        event.detail.checkPopulation = checkPopulation(selectChange);
        element.dispatchEvent(event);
        e.stopImmediatePropagation();
    });
}
