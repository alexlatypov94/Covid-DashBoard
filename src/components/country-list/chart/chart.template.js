export const chartTemplate = (lastUpdate) => {
    return `
<div class = "country-list-title">last update: ${lastUpdate} </div>
<ul class ="country-list-countries-wrapper"></ul>
<div class ="country-list-country-search">
<input class="country-list-country-input use-keyboard-input" placeholder="Search...">
<div class ="country-list-keyboard"></div>
</div>
`;
};
export const countryTemplate = (countryCode, countryFlag, country, value) => {
    return `
<li class ="country-list-country-wrapper" data-country ="${countryCode}">
	<span><img class="country-list-flag" src="${countryFlag}"></span>
	<span class="country-list-country-name" data-country-name ="${country}">${country}</span>
	<div class="country-list-value ">${value}</div>
</li>
`;
};
