import "./assets/css/style.scss";
import { BaseMarkup, getJSON } from "./modules/index";

const markup = new BaseMarkup();

markup.init();

const firstAPI = "https://api.covid19api.com/summary";

getJSON(firstAPI).then((data) => console.log(data));
