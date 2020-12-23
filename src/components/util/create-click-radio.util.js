function changeParametersRadio(targetRadio) {
    const dataAttribute = targetRadio.getAttribute("data-attribute");
    return dataAttribute !== "total" && dataAttribute !== "general-hundreed" ? "today" : "total";
}

function checkPopulation(label) {
    const dataAttr = label.getAttribute("data-attribute");
    if (dataAttr !== "total" && dataAttr !== "new") {
        return true;
    }

    return false;
}

function getDataAttr(label) {
    const labelDataAttr = label.getAttribute("data-attribute")
    switch (labelDataAttr) {
        case "total":
            return "Cumulative"
        case "new":
           return "Day"
        case "general-hundreed":
            return "Cumulative/100"
        default:
           return "Day/100"
    }
}

export function createClickRadio(element) {
    const event = new CustomEvent("clickRadioBtn", {
        detail: { targetRadio: undefined, paramNewOrTotal: undefined, checkPopulation: undefined, dataAttr: undefined },
        bubbles: true,
        cancelable: true
    });

    element.addEventListener("click", (e) => {
        const radioClick = e.target.closest("label");
        if (!radioClick) {
            return;
        }
        event.detail.dataAttr = getDataAttr(radioClick)
        event.detail.targetRadio = radioClick;
        event.detail.paramNewOrTotal = changeParametersRadio(radioClick);
        event.detail.checkPopulation = checkPopulation(radioClick);
        element.dispatchEvent(event);
        e.stopImmediatePropagation();
    });
}
