import "./assets/css/style.scss";
import { BaseMarkup, GlobalTable, CountryList, MapCovied, legendMapHandler, DrawGraph } from "./components/index";

const markup = new BaseMarkup();
const globalTable = new GlobalTable();
const graph = new DrawGraph();
const countryList = new CountryList();
const mapCovied = new MapCovied();

markup.init();
globalTable.init();
graph.init();
countryList.init();
mapCovied.init();
legendMapHandler();

/* Counter for full size */

let btnFullSizeClick = false;
// let countryClick = false;
function changeRadioBtnCheckedAttribute(valueChangeForTable) {
    const arrayForCheck = ["Cumulative", "Day", "Cumulative/100", "Day/100"];
    const radio = document.querySelectorAll(".global-table-radio-btn");
    const indexCheck = arrayForCheck.indexOf(valueChangeForTable);
    radio[indexCheck].setAttribute("checked", "checked");
}

/**
 * Global controller
 */

const bodyEl = document.querySelector("body");

function globalEventHandler(event) {
    const switchPos = event?.detail?.targetBtn;
    countryList.onSwitchCountryList(switchPos);
    globalTable.onSwithStatistics(switchPos);
    graph.onSwitchGraph(switchPos);
    mapCovied.onSwitch(switchPos)
}
bodyEl.addEventListener("globalClickEvent", globalEventHandler);

/**
 * Full Screen
 * And
 */

function addClassFullSreenAndRadio(e) {
    if (e.target.closest(".base-markup-btn-increase")) {
        !btnFullSizeClick
            ? e.target.parentNode.classList.add("full-screen-window")
            : e.target.parentNode.classList.remove("full-screen-window");

        btnFullSizeClick = !btnFullSizeClick;
    }
}

bodyEl.addEventListener("click", addClassFullSreenAndRadio);

/**
 * Radio Button
 */

function hundlerRadioButton(e) {
    const paramNewOrTotal = e?.detail?.paramNewOrTotal;
    const checkPopulation = e?.detail.checkPopulation;
    const dataAttr = e?.detail?.dataAttr
    const configGraph = paramNewOrTotal !== "total" ? "Day" : "Cumulative";
    const selectCountry = document.querySelector(".draw-graph-select")

    selectCountry.value = dataAttr

    countryList.onRadioClick(paramNewOrTotal, checkPopulation);
    globalTable.onRadioButtonClick(paramNewOrTotal, checkPopulation);
    graph.onRadioClick(configGraph, checkPopulation);
    mapCovied.onRadioClick(paramNewOrTotal, checkPopulation)
}

bodyEl.addEventListener("clickRadioBtn", hundlerRadioButton);

/**
 * change selector global data
 */

function hundlerSelectGlobalGraph(e) {
    const valueChangeForGraph = e?.detail?.valueChangeForGraph;
    const valueChangeForTable = e?.detail?.valueChangeForTable;
    const checkPopulation = e?.detail?.checkPopulation;
    const country = e?.detail?.country
    let clickSelect = false
    console.log(country)
    if(country === "All world") {
        clickSelect = true
    }
    if(country === "Cumulative" || country === "Day" || country === "Cumulative/100" || country === "Day/100") {
        countryList.onRadioClick(valueChangeForTable, checkPopulation);
        globalTable.onRadioButtonClick(valueChangeForTable, checkPopulation);
        graph.onRadioClick(valueChangeForGraph, checkPopulation);
        changeRadioBtnCheckedAttribute(valueChangeForGraph);
    } else {
        countryList.onChooseCountry(country, clickSelect);
        globalTable.onChooseCountry(country, clickSelect);
        graph.onChooseCountry(country, clickSelect)
        mapCovied.onZoomCurrentCountry(country, clickSelect)
    } 
    
    
}

bodyEl.addEventListener("clickChangeSelectGlobal", hundlerSelectGlobalGraph);

function clickCountry(e) {
    const country = e?.detail?.country;
    const checkClick = e?.detail?.countryClick;
    const countryFullName = e?.detail?.countryFullName
    const selectCountry = document.querySelector(".draw-graph-select-coutry")
    selectCountry.value = !checkClick ? countryFullName : "All world"
    countryList.onChooseCountry(country, checkClick);
    globalTable.onChooseCountry(country, checkClick);
    graph.onChooseCountry(country, checkClick)
    mapCovied.onZoomCurrentCountry(country, checkClick)
}

bodyEl.addEventListener("clickChooseCountry", clickCountry);
