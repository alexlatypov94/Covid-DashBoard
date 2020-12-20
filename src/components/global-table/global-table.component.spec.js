// import { sortData } from "./utils/sort-data.util";

// const test = [{ value: 1 }, { value: 2 }, { value: 5 }, { value: 3 }, { value: 4 }];
// const result = [{ value: 5 }, { value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }];

// describe("sortData ", () => {
//     test("shoud be sort data", () => {
//         expect(sortData(test, "value")).toEqual(result);
//     });
// });

import { GlobalTable } from "./global-table.component";

const table = new GlobalTable();

describe("GlobalTable ", () => {
    test('shoud be have property "service"', () => {
        expect(table).toHaveProperty("service");
    });
});
