import "./global-table.scss";

export const globalTableTemplate = (categoryName, tableName, amount, color) => {
    return `
            <h6 class = "global-table-title">${tableName}</h6>
            <h1 class = "global-table-amount-global-case ${color}">${amount}</h1>
            <div class = "global-table-total-case-wrapper"></div>
            <div class = "global-table-switch-wrapper">
                <div class="global-table-switch-wrapper arrow-buttons">
                    <button type="button" class="global-table-btn-changes global-table-left-change arrow-btn">
                    <svg class="global-table-btn-changes global-table-left-change svg-arrow" width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
                        <polygon class="arrow-6-pl"
                            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
                        </polygon>
                        <polygon class="arrow-6-pl-fixed"
                            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
                        </polygon>
                        <path
                            d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z">
                        </path>
                        </g>
                    </svg>
                    </button>
                    <span class="global-table-title-current-category">${categoryName}</span>
                    <button type="button" class="global-table-btn-changes global-table-right-change arrow-btn">
                    <svg class="global-table-btn-changes global-table-right-change svg-arrow" width="18px" height="17px" viewBox="-1 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g>
                        <polygon class="arrow-6-pl"
                            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
                        </polygon>
                        <polygon class="arrow-6-pl-fixed"
                            points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596">
                        </polygon>
                        <path
                            d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z">
                        </path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    `;
};

export const radioButton = `
        <form class = "global-table-checkbox-wrapper">
            <div class = "global-table-radio-single">
                <label for = "check-global-death" data-attribute = "total">General</label>
                <input type = "radio" name = "global-table" class = "global-table-radio-btn cumulative" id = "check-global-death" checked>
                <label for = "check-global-death" class = "global-table-style-radio-btn" data-attribute = "total"></label>
            </div>
            <div class = "global-table-radio-single">
                <label for = "check-global-received" data-attribute = "new">day</label>
                <input type = "radio" name = "global-table" class = "global-table-radio-btn day" id = "check-global-received"> 
                <label for = "check-global-received" class = "global-table-style-radio-btn" data-attribute = "new"></label>
            </div>
            <div class = "global-table-radio-single">
                <label for = "death-hundreed" data-attribute = "general-hundreed">General / 100</label>
                <input type = "radio" name = "global-table" class = "global-table-radio-btn" id = "death-hundreed"> 
                <label for = "death-hundreed" class = "global-table-style-radio-btn" data-attribute = "general-hundreed"></label>
            </div>
            <div class = "global-table-radio-single">
                <label for = "received-hundreed" data-attribute = "day-hundreed">day / 100</label>
                <input type = "radio" name = "global-table" class = "global-table-radio-btn" id = "received-hundreed">
                <label for = "received-hundreed" class = "global-table-style-radio-btn" data-attribute = "day-hundreed"></label>
            </div>
        </form>
        
        <div class = "global-table"></div>
    `;

export const totalCaseWrapperTemplate = (color, populations, title, country, iso) => {
    return `
    <div class = "global-table-table-item" data-countryIso = "${iso}" data-countryFull = "${country}">
        <div class = "${color}">
            <span class = "global-table-total-number">${populations}</span>
                ${title}
        </div>
        <span class = "global-table-country-style">${country}</span>
    </div>`;
};
