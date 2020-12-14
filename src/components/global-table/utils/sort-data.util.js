import { ONE_HUNDREED } from "../../../core/constants";

export function sortData(data, parameter) {
    return data?.sort((a, b) => (a[parameter] > b[parameter] ? -1 : 1));
}

export function updateDataForHundreed(data, param) {
    return data?.map((element, index) => {
        return {
            ...element,
            ...element[index],
            [param]: element.population === 0 ? 0 : Number(((element[param] / element.population) * ONE_HUNDREED).toFixed(3))
        };
    });
}
