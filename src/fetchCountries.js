
export default function fetchCountries(name) {
    const filters = 'name,capital,population,flags,languages';
    const BASE_URL = "https://restcountries.com/v3.1";

    const URL = `${BASE_URL}/name/${name}?fields=${filters}`;

    return fetch(URL)
        .then(responce => {
            if (responce.status === 404) {
                throw new Error(responce.status);
            } else {
                return responce.json()
            }
        })
};