import { CovidDashboardService } from "./covid-dashboard.service";

const dashboard = new CovidDashboardService();

describe("CovidDashboardService ", () => {
    test("getFullInformationCountry shoud be return object", () => {
        return dashboard.getFullInformationCountry().then((data) => {
            expect(data).toBeInstanceOf(Object);
        });
    });
    test("getCountries shod be contain fields", () => {
        return dashboard.getCountries().then((data) => {
            expect(data[0]).toEqual(
                expect.objectContaining({
                    country: expect.any(String),
                    iso: expect.any(String),
                    slug: expect.any(String)
                })
            );
        });
    }, 10000);
});
