import { GlobalTable } from "./global-table.component";

const table = new GlobalTable();

describe("GlobalTable ", () => {
    test('shoud be have property "service"', () => {
        expect(table).toHaveProperty("service");
    });
});
