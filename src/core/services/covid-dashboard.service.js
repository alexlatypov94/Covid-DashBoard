import { CovidDashBoardApiService } from "./covid-dashboard-api.service";
import { mapSummaryCountries, mapDayOneCountry } from "./utils/index";

export class CovidDashboardService {
    constructor() {
        this.apiService = new CovidDashBoardApiService();
    }

    /**
     * A summary of new and total cases per country updated daily.
     */
    getSummary() {
        return this.apiService.getSummary().then((res) => {
            const global = {
                newConfirmed: res?.Global?.NewConfirmed,
                newDeaths: res?.Global?.NewDeaths,
                newRecovered: res?.Global?.NewRecovered,
                totalConfirmed: res?.Global?.TotalConfirmed,
                totalDeaths: res?.Global?.TotalDeaths,
                totalRecovered: res?.Global?.TotalRecovered
            };

            return {
                countries: mapSummaryCountries(res?.Countries),
                global,
                date: res?.Date,
                message: res?.Message
            };
        });
    }

    /**
     * Returns all the available countries and provinces, as well as the country slug for per country requests.
     */
    getCountries() {
        return this.apiService.getCountries().then((res) => {
            return res?.map((data) => {
                return {
                    country: data?.Country,
                    iso: data?.ISO2,
                    slug: data?.Slug
                };
            });
        });
    }

    /**
     * Returns all cases by case type for a country from the first recorded case.
     * Country must be the Slug from /countries or /summary.
     * Cases must be one of: confirmed, recovered, deaths
     */
    getDayOne(countryName) {
        return this.apiService.getDayOne(countryName).then((res) => mapDayOneCountry(res));
    }
}
