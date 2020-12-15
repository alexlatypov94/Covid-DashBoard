import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable, CountryList, MapCovied, legendMapHandler } from "./components/index";

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
const graph = new DrawGraph();
markup.init();
globalTable.init();
graph.initGraph();
const countryList = new CountryList();

countryList.init();
const mapCovied = new MapCovied();
mapCovied.init();
legendMapHandler();
