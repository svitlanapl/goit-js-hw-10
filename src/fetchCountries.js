const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = 'name,capital,population,flags,languages';

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=${FILTER}`).then(response => {
        // if (response.status === 404) {
        //     return Promise.reject(
        //         new Error(`is not ok: ${response.status}`)
        //     );
        // }
        if (!response.ok) {
            throw new Error(`is not ok: ${response.status}`);
        } else {
             return response.json();
        }
       
    });
};
