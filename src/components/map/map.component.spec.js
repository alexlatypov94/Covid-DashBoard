import { MapCovied } from "./map.component";

const map = new MapCovied();

describe("MapCovied ", () => {
    test("getPopupMapName shoud be return correct names", () => {
        expect(map.getPopupMapName("totalCases")).toBe("Total cases");
        expect(map.getPopupMapName("totalDeaths")).toBe("Total deaths");
        expect(map.getPopupMapName("totalRecovered")).toBe("Total recovered");
        expect(map.getPopupMapName("todayCases")).toBe("Today Cases");
        expect(map.getPopupMapName("todayDeaths")).toBe("Today Deaths");
        expect(map.getPopupMapName()).toBe("Today Recovered");
    });
});
