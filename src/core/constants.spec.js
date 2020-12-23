import { API_URL, API_URL_FLAGS_POPULATION, COUNTRIES, API_FOR_GRAPH_GLOBAL } from "./constants";

describe("URL ", () => {
    test(" API_URL shoud be URL", () => {
        expect(API_URL).toMatch(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        );
    });
    test(" API_URL_FLAGS_POPULATION shoud be URL", () => {
        expect(API_URL_FLAGS_POPULATION).toMatch(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        );
    });
    test(" COUNTRIES shoud be URL", () => {
        expect(COUNTRIES).toMatch(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        );
    });
    test(" API_FOR_GRAPH_GLOBAL shoud be URL", () => {
        expect(API_FOR_GRAPH_GLOBAL).toMatch(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        );
    });
});
