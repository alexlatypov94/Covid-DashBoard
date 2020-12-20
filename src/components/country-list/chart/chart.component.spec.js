import { Chart } from "./chart.component";

describe("Chart ", () => {
    test("shoud be instance of Chart", () => {
        expect(new Chart()).toBeInstanceOf(Chart);
    });
});
