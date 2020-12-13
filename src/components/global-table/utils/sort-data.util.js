export function sortData(data, parameter) {
    return data?.sort((a, b) => (a[parameter] > b[parameter] ? -1 : 1));
}
