import * as L from "leaflet";
import { mapComponent } from "./map.template";
import { CovidDashboardService } from "../../core/services/covid-dashboard.service";
import { legendMapHandler } from "./legend/index";
import "./map.scss";

export class MapCovied {
    constructor() {
        this.service = new CovidDashboardService();
        this.mapOptions = {
            center: [38.9072, -77.0369],
            zoom: 2,
            minZoom: 2
        };
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
            case "active":
                return "Active";
            case "recovered":
                return "Total recovered";
            case "death":
                return "Total deaths";
            default:
                return "Total cases";
        }
    }

    getPopup(color, latlng, option, name, value, parent) {
        const html = `
    <span class="icon-marker" data-color=${color}>
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

    getOptionValue(optionValue, element) {
        switch (optionValue) {
            case "cases":
                return element.totalCases;
            case "active":
                return element.active;
            case "recovered":
                return element.totalRecovered;
            case "deaths":
                return element.totalDeaths;
            default:
                return element.totalCases;
        }
    }

    createMap(optionValue = "totalCases") {
        const map = new L.map("map", this.mapOptions);
        const layer = new L.TileLayer(
            "https://api.mapbox.com/styles/v1/a-dubich12/ckinaajq421by17ln58g3yk5w/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYS1kdWJpY2gxMiIsImEiOiJja2luYW4yMHIwbW85MnFwMzNtbjN6NnA4In0.umEsEDfqpq8U8GjB06jKwA"
        );
        map.addLayer(layer);

        // coordinates that limit the movement of the map on the right
        const limitMovementRight = L.latLng(-76.0369, 178.9072);
        // coordinates that limit the movement of the map on the left
        const limitMovementLeft = L.latLng(76.0369, -158.9072);
        // that limit the movement of the map
        const bounds = L.latLngBounds(limitMovementRight, limitMovementLeft);

        map.setMaxBounds(bounds);
        map.on("drag", () => {
            map.panInsideBounds(bounds, { animate: false });
        });

        this.service.getFullInformationCountry().then((data) => {
            data.forEach((element) => {
                const latLong = [element.countryInfo.lat, element.countryInfo.long];
                const filterOption = this.getOptionValue(optionValue, element);
                if (element.totalCases < 100) {
                    this.getPopup("green", latLong, element, optionValue, filterOption, map);
                } else if (filterOption < 1000 && filterOption > 99) {
                    this.getPopup("blue", latLong, element, optionValue, filterOption, map);
                } else if (filterOption < 10000 && filterOption > 999) {
                    this.getPopup("yellow", latLong, element, optionValue, filterOption, map);
                } else if (filterOption < 100000 && filterOption > 9999) {
                    this.getPopup("orange", latLong, element, optionValue, filterOption, map);
                } else {
                    this.getPopup("red", latLong, element, optionValue, filterOption, map);
                }
            });
        });
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

    init(value = "totalCases") {
        mapComponent(document.querySelector(".world-map"));
        this.createMap(value);
        this.mapButtonsHandler();
    }
}
