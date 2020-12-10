export class BaseMarkup {
    init() {
        document.body.insertAdjacentHTML('afterbegin', `
        <header>
        
        </header>
        <main>
        <div class = "wrapper">
            <div class = "country-list"></div>
            <div class = "wrapper-for-map">
                <div class = "world-map"></div>
                <div class = "graph"></div>
            </div>
            <div class = "table"></div>
        </div>
        </main>
        <footer>
        
        </footer>
        
        `)

    }

}
