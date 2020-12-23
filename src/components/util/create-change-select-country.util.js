export function createChangeSelectCountry(element, data) {
    const event = new CustomEvent("clickChangeSelectCountry", {
        detail: { country: undefined },
        bubbles: true,
        cancelable: true
    });

    element.addEventListener("click", (e) => {
        const selectChange = e.target.value;
        if (!selectChange) {
            return;
        }

        event.detail.country =
            data?.filter((item) => item?.country === e.target.value)[0]?.countryInfo?.iso3 || "All world";
        element.dispatchEvent(event);
        e.stopImmediatePropagation();
    });
}
