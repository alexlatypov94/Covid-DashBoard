export const chartTemplate = `
<div class = "country-list-title">title</div>
<ul class ="countries-wrapper"></ul>
<div class ="country-search">
<input class="country-input" placeholder="Search...">
<div class ="country-keyboard"></div>
</div>

`;
export const countryTemplate = (countryCode, countryFlag, country, categoryName) => {
    return `
<li class ="country-wrapper" data-country ="${countryCode}">
	<span><img class="flag" src="${countryFlag}"></span>
	<span class="country-list-country-name">${country}</span>
	<span class="country-list-value ">${categoryName}</span>
</li>
`;
};
// <span class="country-list-flag last-flag"></span>
