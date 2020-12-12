import { chartTemplate, countryTemplate } from "./chart.template";

export class Chart {
    log(data) {
        console.log(data);
    }

    init() {
        const chart = document.querySelector(".country-list-wrapper");
        chart.insertAdjacentHTML("beforeend", chartTemplate);
    }

    render(data) {
        const sortDataCountries = data.sort((a, b) => (b.totalCases > a.totalCases ? 1 : -1));
        const chart = document.querySelector(".countries-wrapper");

        sortDataCountries.forEach((item) => {
            chart.insertAdjacentHTML(
                "beforeend",
                countryTemplate(item.countryInfo.iso3, item.countryInfo.flag, item.country, item.totalCases)
            );
        });
    }

    serch() {
        const searchField = document.querySelector(".country-input");
        const filter = searchField.value.toUpperCase();
        const elements = document.querySelectorAll(".country-wrapper");

        for (let i = 0; i < elements.length; i += 1) {
            const country = elements[i].childNodes[3];
            const txtValue = country.textContent || country.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                elements[i].style.display = "";
            } else {
                elements[i].style.display = "none";
            }
        }
    }
}
