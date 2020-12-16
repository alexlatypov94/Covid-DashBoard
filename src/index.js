import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable, Keyboard } from "./components/index";
import { keyboard } from "./components/keyboard/keyboard.component.template";

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
markup.init();
globalTable.init();
Keyboard.initArea();
Keyboard.init();
Keyboard.keypress();

