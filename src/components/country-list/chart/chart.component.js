import { chartTemplate} from "./chart.template";

export class Chart {

    log(data) {
        console.log(data);
		}
		
		init() {
			const chart = document.querySelector(".country-list-wrapper");
			chart.insertAdjacentHTML("beforeend", chartTemplate);
	}

 	render(data){
	const sortDataCountries = data.sort((a, b) => (b.totalConfirmed > a.totalConfirmed ? 1 : -1));

		const chart = document.querySelector(".countries-wrapper");
		sortDataCountries.forEach((item) => {

		chart.insertAdjacentHTML("beforeend", `
		
		<div class ="country-wrapper">
	<span><img class="flag" src="${item.flag}"></span>
	<span class="country-list-country-name last-country">${item.country}</span>
	<span class="country-list-value last-value">${item.totalConfirmed}</span>
</div>
		`);
		})
	}
}

