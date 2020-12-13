export const globalTableTemplate = (categoryName, tableName, amount, color) => {
    return `
            <h6 class = "global-table-title">${tableName}</h6>
            <h1 class = "amount-global-case ${color}">${amount}</h1>
            <div class = "total-case-wrapper"></div>
            <div class = "switch-wrapper">
                <button type = "button" class = "btn-changes left-change"><</button>
                <span class = "title-current-category">${categoryName}</span>
                <button type = "button" class = "btn-changes right-change">></button>
            </div>
    `;
};

export const radioButton = `
        <form class = "checkbox-wrapper">
            <div class = "radio-single">
                <label for = "check-global-death" data-attribute = "total">General</label>
                <input type = "radio" name = "global-table" class = "radio-btn" id = "check-global-death" checked>
                <label for = "check-global-death" class = "style-radio-btn" data-attribute = "total"></label>
            </div>
            <div class = "radio-single">
                <label for = "check-global-received" data-attribute = "new">day</label>
                <input type = "radio" name = "global-table" class = "radio-btn" id = "check-global-received"> 
                <label for = "check-global-received" class = "style-radio-btn" data-attribute = "new"></label>
            </div>
            <div class = "radio-single">
                <label for = "death-hundreed" data-attribute = "General-hundreed">General / 100</label>
                <input type = "radio" name = "global-table" class = "radio-btn" id = "death-hundreed"> 
                <label for = "death-hundreed" class = "style-radio-btn" data-attribute = "General-hundreed"></label>
            </div>
            <div class = "radio-single">
                <label for = "received-hundreed" data-attribute = "Day-hundreed">day / 100</label>
                <input type = "radio" name = "global-table" class = "radio-btn" id = "received-hundreed">
                <label for = "received-hundreed" class = "style-radio-btn" data-attribute = "Day-hundreed"></label>
            </div>
        </form>
        <div class = "global-table"></div>
    `;

export const totalCaseWrapperTemplate = (color, populations, title, country) => {
    return `
    <div class = "table-item">
        <div class = "${color}">
            <span class = "total-number">${populations}</span>
                ${title}
        </div>
        <span class = "country-style">${country}</span>
    </div>`;
};
