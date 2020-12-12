import "./assets/css/style.scss";
import { BaseMarkup, getJSON } from "./components/index";

const markup = new BaseMarkup();

markup.init();

const firstAPI = "https://api.covid19api.com/summary";

getJSON(firstAPI).then((data) => console.log(data));
