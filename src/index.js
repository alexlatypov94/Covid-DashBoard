import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable, Keyboard } from "./components/index";

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
markup.init();
globalTable.init();
Keyboard.initArea();
