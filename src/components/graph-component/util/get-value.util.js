import { ONE_HUNDREED } from "../../../core/index";

export function getValueCumulative(obj, population) {
    if (!population) {
        return Object.values(obj || {});
    }
    if (!obj) {
        return {};
    }
    return Object.values(obj)?.map((el) => {
        return (el / population) * ONE_HUNDREED;
    });
}

export function getKeys(obj, param) {
    return Object.keys(obj?.[param] || {});
}

export function getValueDays(obj, population) {
    if (!population) {
        return Object.values(obj || {})
            .map((item, index, arr) => item - (arr[index - 1] || 0));
    }

    if (!obj) {
        return {};
    }

    return Object.values(obj)
        .map(
            (item, index, arr) =>
                (item / population) * ONE_HUNDREED - ((arr[index - 1] / population) * ONE_HUNDREED || 0)
        )
        .filter((el) => el > 0);
}
