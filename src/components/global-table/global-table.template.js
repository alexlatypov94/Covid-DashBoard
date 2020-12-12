export const globalTableTemplate = `
            <div class = "global-death">
                <h6 class = "global-title">Global case</h6>
                <h1 class = "amount-global-death">Global death</h1>
                <form class = "checkbox-wrapper">
                    <div class = "radio-single">
                        <label for = "check-global-death" data-attribute = "Total">General</label>
                        <input type = "radio" name = "global-table" class = "radio-btn" id = "check-global-death" checked>
                        <label for = "check-global-death" class = "style-radio-btn" data-attribute = "Total"></label>
                    </div>
                   <div class = "radio-single">
                        <label for = "check-global-received" data-attribute = "New">day</label>
                        <input type = "radio" name = "global-table" class = "radio-btn" id = "check-global-received"> 
                        <label for = "check-global-received" class = "style-radio-btn" data-attribute = "New"></label>
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
                <div class = "total-death-wrapper"></div>
                <div class = "switch-wrapper">
                    <button type = "button" class = "btn-changes left-change"><</button>
                    <span class = "title-current-category">Global Death</span>
                    <button type = "button" class = "btn-changes right-change">></button>
                </div>
            </div>
        `;
