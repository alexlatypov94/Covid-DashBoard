let audio;
export function playAydio(url) {
    if (!audio) {
        audio = new Audio();
    }

    audio.src = url;
    audio.load();
    audio.play();
}
