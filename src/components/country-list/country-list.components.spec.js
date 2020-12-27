import { CountryList } from "./country-list.component";

const countryList = new CountryList()

describe("CountryList ", () => {
    test("shoud be defined", () => {
        expect(countryList).toBeDefined();
    });
});
