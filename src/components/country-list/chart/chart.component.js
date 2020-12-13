import { chartTemplate } from "./chart.template";

export class Chart {
    log(data) {
        console.log(data);
    }

    init() {
        const chart = document.querySelector(".country-list-wrapper");
        chart.insertAdjacentHTML("beforeend", chartTemplate);
    }

    render(data) {
        const sortDataCountries = data.sort((a, b) => (b.totalConfirmed > a.totalConfirmed ? 1 : -1));

        const chart = document.querySelector(".countries-wrapper");
        sortDataCountries.forEach((item) => {
            chart.insertAdjacentHTML(
                "beforeend",
                `
							  <li class ="country-wrapper" data-country ="${item.code}">
									<span><img class="flag" src="${item.flag}"></span>
									<span class="country-list-country-name">${item.country}</span>
									<span class="country-list-value ">${item.totalConfirmed}</span>
								</li>
		`
            );
        });
    }

    serch() {
        const input = document.querySelector(".country-input");
        const filter = input.value.toUpperCase();
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
