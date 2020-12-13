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

    getFlagsAndPopulations() {
        return this.apiService.getFlagPopulations().then((res) => {
            return res?.map((data) => {
                return {
                    flag: data?.flag,
                    name: data?.name,
                    population: data?.population
                }
            })
        })
    }

    getCountriesCoordinate() {
        return this.apiService.getApiCountries().then((res) => {
            return res?.map((data) => {
                return {
                    updated: data?.updated,
                    country: data?.country,
                    countryInfo: data?.countryInfo,
                    cases: data?.cases,
                    todayCases: data?.todayCases,
                    deaths: data?.deaths,
                    todayDeaths: data?.todayDeaths,
                    recovered: data?.recovered,
                    todayRecovered: data?.todayRecovered,
                    active: data?.active,
                    critical: data?.critical,
                    casesPerOneMillion: data?.casesPerOneMillion,
                    deathsPerOneMillion: data?.deathsPerOneMillion,
                    tests: data?.tests,
                    testsPerOneMillion: data?.testsPerOneMillion,
                    population: data?.population,
                    continent: data?.continent,
                    oneCasePerPeople: data?.oneCasePerPeople,
                    oneDeathPerPeople: data?.oneDeathPerPeople,
                    oneTestPerPeople: data?.oneTestPerPeople,
                    activePerOneMillion: data?.activePerOneMillion,
                    recoveredPerOneMillion: data?.recoveredPerOneMillion,
                    criticalPerOneMillion: data?.criticalPerOneMillion
                }
            })
        })
    }
}
