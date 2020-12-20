import { Keyboard } from "./keyboard.component";

const fragment = document.createDocumentFragment();

describe("Keyboard ", () => {
    test("shoud be return instance of DocumentFragment", () => {
        expect(Keyboard.createKeys()).toMatchObject(fragment);
    });
});
