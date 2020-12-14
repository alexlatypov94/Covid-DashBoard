import "./global-table.scss";

export const globalTableTemplate = (categoryName, tableName, amount, color) => {
    return `
            <h6 class = "global-table-title">${tableName}</h6>
            <h1 class = "global-table-amount-global-case ${color}">${amount}</h1>
            <div class = "global-table-total-case-wrapper"></div>
            <div class = "global-table-switch-wrapper">
                <button type = "button" class = "global-table-btn-changes left-change"><</button>
                <span class = "global-table-title-current-category">${categoryName}</span>
                <button type = "button" class = "global-table-btn-changes right-change">></button>
            </div>
    `;
};

export const radioButton = `
        <form class = "global-table-checkbox-wrapper">
            <div class = "global-table-radio-single">
                <label for = "check-global-death" data-attribute = "total">General</label>
                <input type = "radio" name = "global-table" class = "global-table-radio-btn" id = "check-global-death" checked>
                <label for = "check-global-death" class = "global-table-style-radio-btn" data-attribute = "total"></label>
            </div>
            <div class = "global-table-radio-single">
                <label for = "check-global-received" data-attribute = "new">day</label>
                <input type = "radio" name = "global-table" class = "global-table-radio-btn" id = "check-global-received"> 
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

export const totalCaseWrapperTemplate = (color, populations, title, country) => {
    return `
    <div class = "global-table-table-item">
        <div class = "${color}">
            <span class = "global-table-total-number">${populations}</span>
                ${title}
        </div>
        <span class = "global-table-country-style">${country}</span>
    </div>`;
};
