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

export function getGlobalDivision(data, param) {
    const fullPopulation = data?.reduce((acc, curr) => acc + curr.population, 0)
    const fullCases = data?.reduce((acc, curr) => acc + curr[param], 0)
    return (fullCases / fullPopulation * ONE_HUNDREED).toFixed(3)
}
