import { ONE_HUNDREED } from "../../../core";

export function getValueCumulative(obj, population) {
    if (population === undefined) {
        return Object.values(obj);
    }
    return Object.values(obj).map((el) => {
        return (el / population) * ONE_HUNDREED;
    });
}

export function getKeys(obj) {
    return Object.keys(obj);
}

export function getValueDays(obj, population) {
    if (population === undefined) {
        return Object.values(obj)
            .map((item, index, arr) => item - (arr[index - 1] || 0))
            .filter((el) => el > 0);
    }

    return Object.values(obj)
        .map(
            (item, index, arr) =>
                (item / population) * ONE_HUNDREED - ((arr[index - 1] / population) * ONE_HUNDREED || 0)
        )
        .filter((el) => el > 0);
}
