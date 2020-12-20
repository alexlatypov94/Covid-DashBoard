// const CovidDashboardService = require("./covid-dashboard.service");
// import fetch from "node-fetch";
// import { experiments } from "webpack";
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

    // jest.mock("node-fetch");
    // const { Response } = jest.requireActual("node-fetch");
    // test("some test ", async () => {
    //     fetch.mockReturnValue(Promise.resolve(new Response("4")));
    //     dashboard.getFullInformationCountry().then(() => {});
    //     expect(fetch).toHaveBeenCalledTimes(1);
    // });
});
