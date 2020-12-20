import { MapCovied } from "./map.component";

const map = new MapCovied();

describe("MapCovied ", () => {
    test("getPopupMapName shoud be return correct names", () => {
        expect(map.getPopupMapName("totalCases")).toBe("Total cases");
        expect(map.getPopupMapName("active")).toBe("Active");
        expect(map.getPopupMapName("recovered")).toBe("Total recovered");
        expect(map.getPopupMapName("death")).toBe("Total deaths");
        expect(map.getPopupMapName()).toBe("Total cases");
    });
});
