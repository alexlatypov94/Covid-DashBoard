import { API_URL, URL } from "../constants";

/**
 * COVID19 API Service
 * See more: https://documenter.getpostman.com/view/10808728/SzS8rjbc
 */
export class CovidDashBoardApiService {
    getSummary() {
        return fetch(`${API_URL}/${URL.SUMMARY}`)
            .then((res) => this.getStatus(res))
            .catch((err) => err);
    }

    getCountries() {
        return fetch(`${API_URL}/${URL.COUNTRIES}`)
            .then((res) => this.getStatus(res))
            .catch((err) => err);
    }

    getDayOne(countryName) {
        return fetch(`${API_URL}/${URL.DAYONE}/${URL.COUNTRY}/${countryName}/${URL.STATUS}/${URL.CONFIRMED}`)
            .then((res) => this.getStatus(res))
            .catch((err) => err);
    }

    getStatus(res) {
        return res?.status >= 200 && res?.status < 300 ? res?.json() : undefined;
    }
}
