import { mapSummaryCountries } from "./map-summary-countries.util";

const arr = [];

describe("mapSummaryCountries ", () => {
    test(" shoud be return array", () => {
        expect(mapSummaryCountries(arr)).toBeInstanceOf(Array);
    });
});
