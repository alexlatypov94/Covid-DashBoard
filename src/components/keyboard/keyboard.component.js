import { playAydio } from "../../core/index";

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
    },

    show() {
        document.querySelectorAll(".use-keyboard-input").forEach((element) => {
            this.open(element.value, (currentValue) => {
                // eslint-disable-next-line no-param-reassign
                element.value = currentValue;
            });
        });
    },

    hide() {
        this.triggerEvent("onclose");
        this.close();
    },

    createKeys() {
        const fragment = document.createDocumentFragment();

        const keyLayout = [
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
            "backspace",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            "enter",
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

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this.triggerEvent("onclose");
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
        const input = document.querySelector(".use-keyboard-input");
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
        input.focus();
        playAydio("../../assets/audio/click.mp3");
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
        this.closeKeyboard();
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    },

    closeKeyboard() {
        document.querySelector("body").addEventListener(
            "click",
            (e) => {
                if (!e.target.closest(".keyboard")) {
                    this.hide();
                }
            },
            true
        );
    }
};
