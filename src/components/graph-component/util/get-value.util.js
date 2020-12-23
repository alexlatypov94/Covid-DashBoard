import { ONE_HUNDREED } from "../../../core/index";

export function getValueCumulative(obj, population) {
    if (!population) {
        return Object.values(obj || { error: "error" });
    }
    if (!obj) {
        return { error: "error" };
    }
    return Object.values(obj)?.map((el) => {
        return (el / population) * ONE_HUNDREED;
    });
}

export function getKeys(obj, param) {
    return Object.keys(obj?.[param] || { error: "error" });
}

export function getValueDays(obj, population) {
    if (!population) {
        return Object.values(obj || { error: "error" })
            .map((item, index, arr) => item - (arr[index - 1] || 0))
            .filter((el) => el > 0);
    }

    if (!obj) {
        return { error: "error" };
    }

    return Object.values(obj)
        .map(
            (item, index, arr) =>
                (item / population) * ONE_HUNDREED - ((arr[index - 1] / population) * ONE_HUNDREED || 0)
        )
        .filter((el) => el > 0);
}
