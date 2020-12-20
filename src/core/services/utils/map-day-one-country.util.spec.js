import { mapDayOneCountry } from "./map-day-one-country.util";

const arr = [];

describe("mapDayOneCountry ", () => {
    test(" shoud be return array", () => {
        expect(mapDayOneCountry(arr)).toBeInstanceOf(Array);
    });
});
