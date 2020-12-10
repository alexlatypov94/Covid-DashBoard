export async function getJSON(urle) {
    const url = urle;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
