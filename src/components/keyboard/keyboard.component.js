/* eslint-disable no-restricted-syntax */
import { keyboard } from "./keyboard.component.template"

export const Keyboard = {
	elements: {
		main: null,
		keysContainer: null,
		keys: [],
		cursor: 0,
		rec: null,
		searchField: {},
	},

	eventHandlers: {
		oninput: null,
		onclose: null
	},

	properties: {
		value: "",
		left: "",
		rigth: "",
		capsLock: false,
		shift: false,
		isRu: false,
		isAudio: true,
		isRec: false,
		test: null
	},
	initArea() {
		this.elements.searchField = document.querySelector(".world-map");
		this.elements.searchField.insertAdjacentHTML("beforeend", keyboard);
	},
	init() {
		// Create main elements

		this.elements.main = document.createElement("div");
		this.elements.keysContainer = document.createElement("div");

		// Setup main elements
		this.elements.main.classList.add("keyboard", "keyboard--hidden");
		this.elements.keysContainer.classList.add("keyboard__keys");
		this.elements.keysContainer.appendChild(this.createKeys());

		this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

		// Add to DOM
		this.elements.main.appendChild(this.elements.keysContainer);
		const kwyboarWrapper = document.querySelector(".graph")
		kwyboarWrapper.appendChild(this.elements.main);

		// Automatically use keyboard for elements with .use-keyboard-input
		document.querySelectorAll(".use-keyboard-input").forEach((element) => {
			element.addEventListener("click", () => {
				this.open(element.value, (currentValue) => {
					// eslint-disable-next-line no-param-reassign
					element.value = currentValue;
				});
			});
		});
	},

	createKeys() {
		const fragment = document.createDocumentFragment();

		const keyLayoutUnshift = [
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
			"-",
			"=",
			"backspace",
			"caps",
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
			"shift",
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
			"done",
			"z",
			"x",
			"c",
			"v",
			"b",
			"n",
			"m",
			",",
			".",
			"/",
			"en/ru",
			"space",
			"<-",
			"->",
			"audio",
			"mic"
		];
		const keyLayoutRuUnshift = [
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
			"-",
			"=",
			"backspace",
			"caps",
			"й",
			"ц",
			"у",
			"к",
			"е",
			"н",
			"г",
			"ш",
			"щ",
			"з",
			"х",
			"ъ",
			"shift",
			"ф",
			"ы",
			"в",
			"а",
			"п",
			"р",
			"о",
			"л",
			"д",
			"ж",
			"э",
			"enter",
			"done",
			"я",
			"ч",
			"с",
			"м",
			"и",
			"т",
			"ь",
			"б",
			"ю",
			". ",
			"en/ru",
			"space",
			"<-",
			"->",
			"audio",
			"mic"
		];
		const keyLayoutShift = [
			"!",
			"@",
			"#",
			"$",
			"%",
			"^",
			"&",
			"*",
			"(",
			")",
			"_",
			"+",
			"backspace",
			"caps",
			"Q",
			"W",
			"E",
			"R",
			"T",
			"Y",
			"U",
			"I",
			"O",
			"P",
			"shift",
			"A",
			"S",
			"D",
			"F",
			"G",
			"H",
			"J",
			"K",
			"L",
			"enter",
			"done",
			"Z",
			"X",
			"C",
			"V",
			"B",
			"N",
			"M",
			"<",
			">",
			"?",
			"en/ru",
			"space",
			"<-",
			"->",
			"audio",
			"mic"
		];
		const keyLayoutRuShift = [
			"!",
			'"',
			"№",
			";",
			"%",
			":",
			"? ",
			"*",
			"(",
			")",
			"_",
			"+",
			"backspace",
			"caps",
			"Й",
			"Ц",
			"У",
			"К",
			"Е",
			"Н",
			"Г",
			"Ш",
			"Щ",
			"З",
			"Х",
			"Ъ",
			"shift",
			"Ф",
			"Ы",
			"В",
			"А",
			"П",
			"Р",
			"О",
			"Л",
			"Д",
			"Ж",
			"Э",
			"enter",
			"done",
			"Я",
			"Ч",
			"С",
			"М",
			"И",
			"Т",
			"Ь",
			"Б",
			"Ю",
			", ",
			"en/ru",
			"space",
			"<-",
			"->",
			"audio",
			"mic"
		];

		let keyLayout = [];
		// if (layaut == "shift") { keyLayout = keyLayoutShift }
		// else { keyLayout = keyLayoutUnshift };
		if (this.properties.isRu && this.properties.shift) {
			keyLayout = keyLayoutRuShift;
		} else if (!this.properties.isRu && this.properties.shift) {
			keyLayout = keyLayoutShift;
		} else if (!this.properties.isRu && !this.properties.shift) {
			keyLayout = keyLayoutUnshift;
		} else {
			keyLayout = keyLayoutRuUnshift;
		}

		// Creates HTML for an icon
		const createIconHTML = (iconName) => {
			return `<i class="material-icons">${iconName}</i>`;
		};

		keyLayout.forEach((key) => {
			const keyElement = document.createElement("button");
			const insertLineBreak =
				["backspace", "p", "enter", "/", "P", "?", "ъ", ". ", "Ъ", ", "].indexOf(key) !== -1;

			// Add attributes/classes
			keyElement.setAttribute("type", "button");
			keyElement.classList.add("keyboard__key");

			switch (key) {
				case "backspace":
					keyElement.classList.add("keyboard__key--wide");
					keyElement.innerHTML = createIconHTML("backspace");

					keyElement.addEventListener("click", () => {
						this.enterBackspace();
						// this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
						this.triggerEvent("oninput");
						if (this.properties.isAudio) {
							const audio = document.querySelector(".audio-fn-bs");
							audio.currentTime = 0;
							audio.play();
						}
					});

					break;

				case "caps":
					keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
					keyElement.innerHTML = createIconHTML("keyboard_capslock");
					if (this.properties.capsLock) {
						keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
					}

					keyElement.addEventListener("click", () => {
						this.toggleCapsLock();
						keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);

						if (this.properties.isAudio) {
							const audio = document.querySelector(".audio-fn-caps");
							audio.currentTime = 0;
							audio.play();
						}
						document.querySelector(".use-keyboard-input").focus();
					});

					break;

				case "shift":
					keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
					keyElement.innerHTML = createIconHTML("keyboard_arrow_up");
					if (this.properties.shift) {
						keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
					}

					keyElement.addEventListener("click", () => {
						this.toggleShift();
						keyElement.classList.toggle("keyboard__key--active", this.properties.shift);

						if (this.properties.isAudio) {
							const audio = document.querySelector(".audio-fn-shift");
							audio.currentTime = 0;
							audio.play();
						}
						document.querySelector(".use-keyboard-input").focus();
					});

					break;

				case "en/ru":
					keyElement.classList.add("keyboard__key--wide");
					keyElement.innerHTML = this.properties.isRu ? "<div>ru</div>" : "<div>en</div>";
					// if (this.properties.isRU) { keyElement.classList.toggle("keyboard__key--active", this.properties.shift); }

					keyElement.addEventListener("click", () => {
						this.elements.rec.abort();
						this.setLanguage();
						// keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
						keyElement.innerHTML = this.properties.isRu ? "<div>ru</div>" : "<div>en</div>";
					});

					break;

				case "enter":
					keyElement.classList.add("keyboard__key--wide");
					keyElement.innerHTML = createIconHTML("keyboard_return");

					keyElement.addEventListener("click", () => {
						this.getCursorPos();
						this.enterLetter("\n");
						this.setCursorPos();
						this.properties.value += "\n";
						this.triggerEvent("oninput");
						if (this.properties.isAudio) {
							const audio = document.querySelector(".audio-fn-enter");
							audio.currentTime = 0;
							audio.play();
						}
					});

					break;

				case "space":
					keyElement.classList.add("keyboard__key--extra-wide");
					// keyElement.innerHTML = createIconHTML("space_bar");
					keyElement.textContent = " ";

					keyElement.addEventListener("click", () => {
						// this.properties.value += " ";
						this.getCursorPos;
						this.enterLetter(" ");
						this.setCursorPos();
						if (this.properties.isAudio) {
							if (this.properties.isRu) {
								const audio = document.querySelector(".audio-ru");
								audio.currentTime = 0;
								audio.play();
							} else {
								const audio = document.querySelector(".audio");
								audio.currentTime = 0;
								audio.play();
							}
						}
						this.triggerEvent("oninput");
					});

					break;

				case "done":
					keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
					keyElement.innerHTML = createIconHTML("check_circle");

					keyElement.addEventListener("click", () => {
						this.close();
						this.triggerEvent("onclose");
					});

					break;

				case "<-":
					// keyElement.classList.add("keyboard__key--wide");
					keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

					keyElement.addEventListener("click", () => {
						// eslint-disable-next-line no-plusplus
						this.elements.cursor = --document.querySelector(".use-keyboard-input").selectionStart;
						document.querySelector(".use-keyboard-input").selectionEnd = this.elements.cursor;
						// console.log(this.elements.cursor);
						if (this.properties.isAudio) {
							if (this.properties.isRu) {
								const audio = document.querySelector(".audio-ru");
								audio.currentTime = 0;
								audio.play();
							} else {
								const audio = document.querySelector(".audio");
								audio.currentTime = 0;
								audio.play();
							}
						}
						// this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
						this.triggerEvent("oninput");
					});

					break;
				case "->":
					// keyElement.classList.add("keyboard__key--wide");
					keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

					keyElement.addEventListener("click", () => {
						// eslint-disable-next-line no-plusplus
						this.elements.cursor = ++document.querySelector(".use-keyboard-input").selectionStart;
						document.querySelector(".use-keyboard-input").selectionEnd = this.elements.cursor;
						console.log(this.elements.cursor);
						if (this.properties.isAudio) {
							if (this.properties.isRu) {
								const audio = document.querySelector(".audio-ru");
								audio.currentTime = 0;
								audio.play();
							} else {
								const audio = document.querySelector(".audio");
								audio.currentTime = 0;
								audio.play();
							}
						}
						this.triggerEvent("oninput");
					});

					break;
				case "audio":
					keyElement.classList.add("keyboard__key--activatable");
					keyElement.innerHTML = createIconHTML("volume_up");
					if (this.properties.isAudio) {
						keyElement.classList.toggle("keyboard__key--active", this.properties.isAudio);
					}
					// if (this.properties.isRU) { keyElement.classList.toggle("keyboard__key--active", this.properties.shift); }

					keyElement.addEventListener("click", () => {
						this.properties.isAudio = !this.properties.isAudio;
						keyElement.classList.toggle("keyboard__key--active", this.properties.isAudio);
					});

					break;

				case "mic":
					keyElement.classList.add("keyboard__key--activatable");
					keyElement.innerHTML = createIconHTML("mic");
					if (this.properties.isRec) {
						keyElement.classList.toggle("keyboard__key--active", this.properties.isRec);
					}
					// if (this.properties.isRU) { keyElement.classList.toggle("keyboard__key--active", this.properties.shift); }

					keyElement.addEventListener("click", () => {
						Keyboard.elements.rec.interimResults = true;

						this.properties.isRec = !this.properties.isRec;
						if (this.properties.isRu) {
							this.elements.rec.lang = "ru-RU";
						} else {
							this.elements.rec.lang = "en-US";
						}
						this.voiceRec();
						if (this.properties.isRec) {
							this.elements.rec.start();
						} else {
							this.elements.rec.removeEventListener("end", this.elements.rec.start);
							this.elements.rec.stop();
							this.elements.rec.abort();
							//	window.SpeechRecognition.stop();
						} // this.elements.rec.stop();

						keyElement.classList.toggle("keyboard__key--active", this.properties.isRec);
						// this.triggerEvent("oninput");
					});

					break;

				default:
					keyElement.textContent = key;

					keyElement.addEventListener("click", () => {
						this.getCursorPos;
						this.enterLetter(keyElement.textContent);
						this.setCursorPos();
						// this.properties.value += keyElement.textContent;//key;
						if (this.properties.isAudio) {
							if (this.properties.isRu) {
								const audio = document.querySelector(".audio-ru");
								audio.currentTime = 0;
								audio.play();
							} else {
								const audio = document.querySelector(".audio");
								audio.currentTime = 0;
								audio.play();
							}
						}
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

	voiceRec() {
		if (this.properties.isRec) {
			// console.log(this.properties.isRec);
			if (this.properties.isRu) {
				this.elements.rec.lang = "ru-RU";
			} else {
				this.elements.rec.lang = "en-US";
			}
			this.elements.rec.addEventListener("result", (e) => {
				const transcript = Array.from(e.results)
					.map((result) => result[0])
					.map((result) => result.transcript)
					.join("");
				this.elements.cursor = document.querySelector(".use-keyboard-input").selectionStart;
				this.properties.left = document
					.querySelector(".use-keyboard-input")
					.value.slice(0, this.elements.cursor);
				this.properties.rigth = document.querySelector(".use-keyboard-input").value.slice(this.elements.cursor);
				this.properties.value = this.properties.left + transcript + this.properties.rigth;
				this.elements.cursor += transcript.length;
				if (e.results[0].isFinal) {
					if (this.properties.isRu) {
						this.elements.rec.lang = "ru-RU";
					} else {
						this.elements.rec.lang = "en-US";
					}
					this.triggerEvent("oninput");
				}
				// this.enterLetter(transcript);
				this.elements.rec.addEventListener("end", this.elements.rec.start);
				document.querySelector(".use-keyboard-input").click();
				console.log(transcript);
			});
		} else {
			this.elements.rec.abort();
		}
	},
	enterLetter(key) {
		this.elements.cursor = document.querySelector(".use-keyboard-input").selectionStart;
		this.properties.left = document.querySelector(".use-keyboard-input").value.slice(0, this.elements.cursor);
		this.properties.rigth = document.querySelector(".use-keyboard-input").value.slice(this.elements.cursor);
		this.properties.value = this.properties.left + key + this.properties.rigth;
		this.elements.cursor += 1;
	},
	enterBackspace() {
		this.elements.cursor = document.querySelector(".use-keyboard-input").selectionStart;
		this.properties.left = document.querySelector(".use-keyboard-input").value.slice(0, this.elements.cursor);
		this.properties.rigth = document.querySelector(".use-keyboard-input").value.slice(this.elements.cursor);
		this.properties.value = this.properties.left.slice(0, -1) + this.properties.rigth;
		this.elements.cursor -= 1;
	},

	setCursorPos() {
		document.querySelector(".use-keyboard-input").selectionStart = this.elements.cursor;
		document.querySelector(".use-keyboard-input").selectionEnd = this.elements.cursor;
	},
	getCursorPos() {
		this.elements.cursor = document.querySelector(".use-keyboard-input").selectionStart;
	},
	triggerEvent(handlerName) {
		if (typeof this.eventHandlers[handlerName] === "function") {
			this.eventHandlers[handlerName](this.properties.value);
		}
		this.setCursorPos();
		// document.querySelector("body > textarea").focus();
	},

	toggleCapsLock() {
		this.properties.capsLock = !this.properties.capsLock;

		for (const key of this.elements.keys) {
			if (key.childElementCount === 0) {
				if (this.properties.capsLock && this.properties.shift) {
					key.textContent = key.textContent.toLowerCase();
				} else if (this.properties.capsLock && !this.properties.shift) {
					key.textContent = key.textContent.toUpperCase();
				} else if (!this.properties.capsLock && this.properties.shift) {
					key.textContent = key.textContent.toUpperCase();
				} else {
					key.textContent = key.textContent.toLowerCase();
				}
			}
		}
	},

	toggleShift() {
		this.properties.shift = !this.properties.shift;
		if (this.properties.shift) {
			document.querySelector(".keyboard").remove();
			this.elements.main.classList.remove("keyboard--hidden");
			// document.body.appendChild(this.elements.main)

			Keyboard.init();
		} else {
			document.querySelector(".keyboard").remove();
			this.elements.main.classList.remove("keyboard--hidden");
			Keyboard.init();
		}
		for (const key of this.elements.keys) {
			if (key.childElementCount === 0) {
				if (this.properties.capsLock && this.properties.shift) {
					key.textContent = key.textContent.toLowerCase();
				} else if (this.properties.capsLock && !this.properties.shift) {
					key.textContent = key.textContent.toUpperCase();
				} else if (!this.properties.capsLock && this.properties.shift) {
					key.textContent = key.textContent.toUpperCase();
				} else {
					key.textContent = key.textContent.toLowerCase();
				}
			}
		}

		document.querySelector(".use-keyboard-input").click();
	},

	setLanguage() {
		this.properties.isRu = !this.properties.isRu;
		if (this.properties.isRu) {
			document.querySelector(".keyboard").remove();
			this.elements.main.classList.remove("keyboard--hidden");
			// document.body.appendChild(this.elements.main)

			Keyboard.init();
		} else {
			document.querySelector(".keyboard").remove();
			this.elements.main.classList.remove("keyboard--hidden");
			Keyboard.init();
		}
		for (const key of this.elements.keys) {
			if (key.childElementCount === 0) {
				if (this.properties.capsLock && this.properties.shift) {
					key.textContent = key.textContent.toLowerCase();
				} else if (this.properties.capsLock && !this.properties.shift) {
					key.textContent = key.textContent.toUpperCase();
				} else if (!this.properties.capsLock && this.properties.shift) {
					key.textContent = key.textContent.toUpperCase();
				} else {
					key.textContent = key.textContent.toLowerCase();
				}
			}
		}

		document.querySelector(".use-keyboard-input").click();
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
	},

	keypress() {
		document.querySelector(".use-keyboard-input").addEventListener("keydown", (e) => {
			for (const key1 of this.elements.keys) {
				if (key1.textContent.toLowerCase() === e.key) {
					key1.classList.add("active");
				}
				// if (key1.textContent == createIconHTML("space_bar") && e.key == " ") { key1.classList.add("active") };
			}

			// console.log(e.key);
		});
		document.querySelector(".use-keyboard-input").addEventListener("keyup", (e) => {
			for (const key1 of this.elements.keys) {
				if (key1.textContent.toLowerCase() === e.key) {
					key1.classList.remove("active");
				}
			}

			// console.log(e.key);
		});
	}
};

window.addEventListener("DOMContentLoaded", function () {
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	// eslint-disable-next-line no-undef
	Keyboard.elements.rec = new SpeechRecognition();
	// Keyboard.init();
	// Keyboard.keypress();
	// document.querySelector(".use-keyboard-input").click();
});
