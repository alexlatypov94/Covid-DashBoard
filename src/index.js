import { from } from "core-js/fn/array";
import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable } from "./components/index";
import { CovidDashboardService } from "./core/index"

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
markup.init();
globalTable.init();
const apicovid = new CovidDashboardService()

const api = apicovid.getSummary()
console.log(api)