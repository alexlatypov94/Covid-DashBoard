import { CovidDashBoardApiService } from "./covid-dashboard-api.service";

const apiService = new CovidDashBoardApiService();

describe("apiService", () => {
    it("should not throw Error", () => {
        const promise = apiService.getCountries();
        expect(promise).resolves.toBeInstanceOf(Object);
        return promise;
    });
});
