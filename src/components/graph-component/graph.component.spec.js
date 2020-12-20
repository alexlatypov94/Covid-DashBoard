import { DrawGraph } from "./graph.component";

const graph = new DrawGraph();

describe("DrawGraph ", () => {
    test("shoud have properties", () => {
        expect(graph).toHaveProperty("service");
        expect(graph).toHaveProperty("label");
        expect(graph).toHaveProperty("keyObj");
        expect(graph).toHaveProperty("backgroundColor");
        expect(graph).toHaveProperty("counterForSwitch");
        expect(graph).toHaveProperty("dataFullCountry");
        expect(graph).toHaveProperty("configForGraph");
        expect(graph).toHaveProperty("globalOrCountry");
        expect(graph).toHaveProperty("chooseCountry");
        expect(graph).toHaveProperty("populationDivision");
        expect(graph).toHaveProperty("population");
        expect(graph).toHaveProperty("btnClick");
    });
});
