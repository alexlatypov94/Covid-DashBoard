export function mapSummaryCountries(arr) {
    return arr?.map((data) => {
        return {
            country: data?.Country,
            code: data?.CountryCode,
            date: data?.Date,
            newConfirmed: data?.NewConfirmed,
            newDeaths: data?.NewDeaths,
            newRecovered: data?.NewRecovered,
            premium: data?.Premium,
            slug: data?.Slug,
            totalConfirmed: data?.TotalConfirmed,
            totalDeaths: data?.TotalDeaths,
            totalRecovered: data?.TotalRecovered
        };
    });
}
