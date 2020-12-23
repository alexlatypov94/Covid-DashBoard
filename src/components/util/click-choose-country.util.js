let countryClick = true;

export function clickChooseCountry(element) {
    const event = new CustomEvent("clickChooseCountry", {
        detail: { country: undefined, countryFullName: undefined, countryClick: undefined },
        bubbles: true,
        cancelable: true
    });

    element.addEventListener("click", (e) => {
        if (e.target.closest(".country-list-country-wrapper")) {
            event.detail.country = e.target.closest(".country-list-country-wrapper").getAttribute("data-country");
            event.detail.countryFullName = e.target
                .closest(".country-list-country-wrapper")
                .getAttribute("data-countryFull");
            event.detail.countryClick = !countryClick;
            countryClick = !countryClick;
        } else if (e.target.closest(".global-table-table-item")) {
            event.detail.country = e.target.closest(".global-table-table-item").getAttribute("data-countryiso");
            event.detail.countryFullName = e.target
                .closest(".global-table-table-item")
                .getAttribute("data-countryFull");
            event.detail.countryClick = !countryClick;
            countryClick = !countryClick;
        } else if (e.target.closest(".icon-marker")) {
            event.detail.country = e.target.closest(".icon-marker").getAttribute("data-country");
            event.detail.countryFullName = e.target.closest(".icon-marker").getAttribute("data-countryFull");
            event.detail.countryClick = !countryClick;
            countryClick = !countryClick;
        } else {
            return;
        }
        element.dispatchEvent(event);
        e.stopImmediatePropagation();
    });
}
