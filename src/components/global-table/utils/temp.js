function sortData(data, parameter) {
    return data?.sort((a, b) => (a[parameter] > b[parameter] ? -1 : 1));
}
const test = [{ value: 1 }, { value: 2 }, { value: 5 }, { value: 3 }, { value: 4 }];
const result = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
