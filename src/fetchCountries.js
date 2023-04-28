const filters = 'capital, population, flags, languages';
const BASE_URL = "https://restcountries.com/v3.1";

export default function fetchCountries(name) {
    const URL = `${BASE_URL}/${name}?fields=${filters};`;

    return fetch(URL)
        .then(responce => {
            if (response.status === 404) {
                throw new Error(responce.status);
            } else {
                return responce.json()
            }
        })
};