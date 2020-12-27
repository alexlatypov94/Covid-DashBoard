import * as L from "leaflet";
import { mapComponent } from "./map.template";
import { CovidDashboardService } from "../../core/index";
import { legendMapHandler } from "./legend/index";
import { clickChooseCountry, createGlobalClick, updateDataForHundreed, sortData } from "../util/index";

export class MapCovied {
    constructor() {
        this.mapApiLink =
            "https://api.mapbox.com/styles/v1/a-dubich12/ckivwnm1449eo19rp13zvgrlv/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYS1kdWJpY2gxMiIsImEiOiJja2l2d3hrbGMxamlhMnluNDdobG03Z2dkIn0.uhYDJIilVqJZsDjTwcmdWg";
        this.service = new CovidDashboardService();
        this.mapOptions = {
            center: [38.9072, -77.0369],
            zoom: 2,
            minZoom: 2
        };
        this.switchCounter = 0;
        this.totalOrToday = "total";
        this.name = `${this.totalOrToday}Cases`;
        this.map = undefined;
        this.zoomCountry = 5;
        this.data = undefined;
        this.population = false;
    }

    createPointsForMap(width, height) {
        return L.icon({
            iconUrl: "../../assets/img/pin.png",
            iconSize: (width, height),
            markerZoomAnimation: true
        });
    }

    getPopupMapName(name) {
        switch (name) {
            case "totalCases":
                return "Total cases";
            case "totalDeaths":
                return "Total deaths";
            case "totalRecovered":
                return "Total recovered";
            case "todayCases":
                return "Today Cases";
            case "todayDeaths":
                return "Today Deaths";
            default: 
                return "Today Recovered"
        }
    }

    getPopup(color, latlng, option, name, value, parent) {

        const html = `
 
    <span class="icon-marker" data-color=${color} data-country = "${option.countryInfo.iso3}" data-countryFull = "${option.country}">
      <span class="icon-marker-tooltip">
        <h2>${option.country}</h2>
        <ul>
          <li><strong>${this.getPopupMapName(name)}:</strong> ${value}</li>
        </ul>
      </span>
    </span>
  `;

        return L.marker(latlng, {
            icon: L.divIcon({
                className: "icon",
                html
            }),
            riseOnHover: true
        }).addTo(parent);
    }

    getOptionValue(element) {
        switch (this.switchCounter) {
            case 0:
                return element[this.name];
            case 1:
                return element[this.name];
            default:
                return element[this.name];
        }
    }

    createMap(optionValue = "totalCases") {
        this.map = L.map("map", this.mapOptions);
        const layer = new L.TileLayer(this.mapApiLink);
        this.map.addLayer(layer);
        // coordinates that limit the movement of the map on the right
        const limitMovementRight = L.latLng(-76.0369, 178.9072);
        // coordinates that limit the movement of the map on the left
        const limitMovementLeft = L.latLng(76.0369, -158.9072);
        // that limit the movement of the map
        const bounds = L.latLngBounds(limitMovementRight, limitMovementLeft);

        this.map.setMaxBounds(bounds);
        this.map.on("drag", () => {
            this.map.panInsideBounds(bounds, { animate: false });
        });

       
        this.initData(optionValue);
    }

    initData(optionValue = this.name) {
        const iconMarker = document.querySelectorAll(".icon-marker");
        iconMarker.forEach((el) => el.remove());
        if(!this.population) {
            this.service.getFullInformationCountry().then((data) => {
                this.data = data;
                data.forEach((element) => {
                    const latLong = [element.countryInfo.lat, element.countryInfo.long];
                    const filterOption = this.getOptionValue(element);
                    this.swithPopUp(latLong, filterOption, element, optionValue);
                });
            });
        } else {
            this.service.getFullInformationCountry().then((data) => {
                this.data = data;
                const sortOfPopulation = updateDataForHundreed(this.data, this.name);
                const sortObject = sortData(sortOfPopulation, this.param);
                sortObject.forEach((element) => {
                    const latLong = [element.countryInfo.lat, element.countryInfo.long];
                    const filterOption = this.getOptionValue(element);
                    this.swithPopUp(latLong, filterOption, element, optionValue);
                });
            });
        }
    }

    swithPopUp(latLong, filterOption, element, optionValue) {
        if (element.totalCases < 100) {
            this.getPopup("green", latLong, element, optionValue, filterOption, this.map);
        } else if (filterOption < 1000 && filterOption > 99) {
            this.getPopup("blue", latLong, element, optionValue, filterOption, this.map);
        } else if (filterOption < 10000 && filterOption > 999) {
            this.getPopup("yellow", latLong, element, optionValue, filterOption, this.map);
        } else if (filterOption < 100000 && filterOption > 9999) {
            this.getPopup("orange", latLong, element, optionValue, filterOption, this.map);
        } else {
            this.getPopup("red", latLong, element, optionValue, filterOption, this.map);
        }
    }

    mapButtonsHandler() {
        const mapButtonsList = document.querySelector(".mapButtons");

        mapButtonsList.addEventListener("click", (e) => {
            if (e.target.classList.contains("mapButtons__item")) {
                const mapButtonsHandler = document.querySelector(".mapButtons");
                const mapBlock = document.getElementById("map");
                const mapContainer = document.querySelector(".world-map");
                mapContainer.removeChild(mapButtonsHandler);
                mapContainer.removeChild(mapBlock);
                this.init(e.target.dataset.value);
                legendMapHandler();
            }
        });
    }

    addEventListener() {
        const map = document.querySelector("#map");
        const btnWrapper = document.querySelector(".mapButtons");
        clickChooseCountry(map);
        createGlobalClick(btnWrapper);
    }

    init(value = "totalCases") {
        mapComponent(document.querySelector(".world-map"));
        this.createMap(value);
        this.mapButtonsHandler();
        this.addEventListener();
    }

    onZoomCurrentCountry(country, checkClick) {
        if (!checkClick) {
            const chooseCountry = this.data.filter((item) => item.countryInfo.iso3 === country)[0] || {
                error: "error"
            };
            if (chooseCountry.error) {
                return;
            }
            this.map.setView([chooseCountry.countryInfo.lat, chooseCountry.countryInfo.long], this.zoomCountry);
        } else {
            this.map.setView(this.mapOptions.center, this.mapOptions.zoom);
        }
    }

    onSwitch(switchPos) {
        const iconMarker = document.querySelectorAll(".icon-marker");
        iconMarker.forEach((el) => el.remove());

        let counter = switchPos === "left" ? this.switchCounter - 1 : this.switchCounter + 1;

        /* The switch button has three positions:
        1. 0 this is Cases position
        2. 1 this is Deaths position
        3. 2 this is Recovered position */

        if (counter > 2) {
            counter = 0;
        } else if (counter < 0) {
            counter = 2;
        }

        switch (counter) {
            case 0:
                this.onChangeParam(this.totalOrToday, "Cases");
                this.initData(this.name);
                break;
            case 1:
                this.onChangeParam(this.totalOrToday, "Deaths");
                this.initData(this.name);
                break;
            default:
                this.onChangeParam(this.totalOrToday, "Recovered");
                this.initData(this.name);
                break;
        }

        this.switchCounter = counter;
    }

    onChangeParam(totalOrToday, name) {
        this.name = `${totalOrToday}${name}`;
    }

    onRadioClick(param, check) {
        this.population = check;
        this.totalOrToday = param;
        this.name = `${this.totalOrToday}Cases`;
        this.initData(this.name)
    }
}
