import { keyboard } from "./keyboard.component.template";

export const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        searchField: {}
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    initArea() {
        this.elements.searchField = document.querySelector(".world-map");
        this.elements.searchField.insertAdjacentHTML("beforeend", keyboard);
        this.init();
    },
    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        const kwyboarWrapper = document.querySelector(".graph");
        kwyboarWrapper.appendChild(this.elements.main);

        // delete this block after button binding
        document.querySelectorAll(".use-keyboard-input").forEach((element) => {
            element.addEventListener("focus", () => {
                this.open(element.value, (currentValue) => {
                    // eslint-disable-next-line no-param-reassign
                    element.value = currentValue;
                });
            });
        });
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "backspace",
            "q",
            "w",
            "e",
            "r",
            "t",
            "y",
            "u",
            "i",
            "o",
            "p",
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            "enter",
            "caps",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            ",",
            ".",
            "done", // delete this block after button binding
            "space"
        ];

        const createIconHTML = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        };

        keyLayout.forEach((key) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "."].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this.triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        // eslint-disable-next-line no-restricted-syntax
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

// window.addEventListener("DOMContentLoaded", function () {
//     Keyboard.init();
// });
