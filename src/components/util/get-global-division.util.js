import { ONE_HUNDREED } from "../../core/index";

export function getGlobalDivision(data, param) {
    const fullPopulation = data?.reduce((acc, curr) => acc + curr.population, 0);
    const fullCases = data?.reduce((acc, curr) => acc + curr[param], 0);
    return ((fullCases / fullPopulation) * ONE_HUNDREED).toFixed(3);
}