// export { fetchCountries };

const BASE_URL = 'https://restcountries.com';
const FILTER = 'name, capital, population, flags, languages';

function fetchCountries(nameCountry) {
    fetch(`${BASE_URL}/v3.1/name/${nameCountry}?fields=${FILTER}`).then(response => {
        // if (response.status === 404) {
        //     return Promise.reject(
        //         new Error('Oops, there is no country with that name')
        //     );
        // }
        if (!response.ok) {
            throw new Error('Oops, there is no country with that name');
        }
        return response.json();
    });
};
