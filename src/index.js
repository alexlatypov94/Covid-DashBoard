import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable, CountryList, MapCovied, legendMapHandler } from "./components/index";

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
markup.init();
globalTable.init();

const countryList = new CountryList();

countryList.init();
const mapCovied = new MapCovied();
mapCovied.init();
legendMapHandler();
