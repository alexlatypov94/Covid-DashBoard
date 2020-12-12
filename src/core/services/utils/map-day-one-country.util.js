export function mapDayOneCountry(arr) {
    return arr?.map((data) => {
        return {
            cases: data?.Cases,
            city: data?.City,
            cityCode: data?.CityCode,
            country: data?.Country,
            countryCode: data?.CountryCode,
            date: data?.Date,
            lat: data?.Lat,
            lon: data?.Lon,
            province: data?.Province,
            status: data?.Status
        };
    });
}
