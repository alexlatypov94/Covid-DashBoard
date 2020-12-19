export class BaseMarkup {
    init() {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `
        <header>
            <h1 class = "header-title">Covid-19 dashboard</h1>
            <img src = "assets/img/virus.svg" alt = "" class = "header-logo">
        </header>
        <main>
        <div class = "wrapper">
            <div class = "country-list"></div>
            <div class = "wrapper-for-map">
                <div class = "world-map"></div>
                <div class = "graph">
                    <button class = "base-markup-btn-increase"><img src = "../assets/img/full-screen.svg"></button>
                </div>
            </div>
            <div class = "table"></div>
        </div>
        </main>
        <footer>
            <div class = "footer-dev-ops">
                <ul class = "dev-ops-list">
                    <li class = "dev-ops-list-person">Developers: </li>
                    <li class = "dev-ops-list-person"><a href = "https://github.com/alexlatypov94" class = "dev-ops-ref"><img class = "footer-github-logo" src = "assets/img/github.svg"><p>Aliaksei Latypay</p></a></li>
                    <li class = "dev-ops-list-person"><a href = "https://github.com/dubichtonya" class = "dev-ops-ref"><img class = "footer-github-logo" src = "assets/img/github.svg"><p>Antonina Dubich</p></a></li>
                    <li class = "dev-ops-list-person"><a href = "https://github.com/nimlu-bot" class = "dev-ops-ref"><img class = "footer-github-logo" src = "assets/img/github.svg"><p>Sergey Nesterov</p></a></li>
                </ul>
                <h3 class = "footer-create-year">2020</h3>
                <a href = "https://rs.school/js/" class = "footer-rs-ref"><img class = "footer-rs-logo" src = "assets/img/rs-school-js.svg"></a>
            </div>
        </footer>
        
        `
        );
    }
}
