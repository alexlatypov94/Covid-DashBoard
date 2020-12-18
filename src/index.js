import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable, CountryList } from "./components/index";
import { MapCovied } from "./components/map/index";
import { legendMapHandler } from "./components/map/legend/index";

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
markup.init();
globalTable.init();

const countryList = new CountryList();

countryList.init();
const mapCovied = new MapCovied();
mapCovied.init();
legendMapHandler();
