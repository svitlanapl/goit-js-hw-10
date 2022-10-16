import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const MESSAGE = 'Too many matches found. Please enter a more specific name.';
const MESSAGE_ERROR = 'Oops, there is no country with that name';

const refs = {
    searchFormEL: document.querySelector('#search-box'),
    listEl: document.querySelector('.country-list'),
    infoEl: document.querySelector('.country-info'),
} 
// console.log(refs.searchFormEL);

// const emptyMarkup = ref => (ref.innerHTML = '');

refs.searchFormEL.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function emptyMarkup(ref) {
    ref.innerHTML = '';
}

function onSearch(evt) {
    evt.preventDefault();
    const textForm = evt.target.value.trim();

    if (!textForm) {
        emptyMarkup(refs.listEl);
        emptyMarkup(refs.infoEl);
        return; 
    } 
        fetchCountries(textForm)
        .then(countries => {
            console.log(countries);
            if (countries.length > 10) {
                Notify.info(MESSAGE);
                return;
            }
            renderMarkup(countries);
        })
        .catch(error => {
            emptyMarkup(refs.listEl);
            emptyMarkup(refs.infoEl);
            Notify.failure(MESSAGE_ERROR);
        });
    }

function renderMarkup(countries) {
    if (countries.length === 1) {
        emptyMarkup(refs.listEl);
        refs.infoEl.innerHTML = infoCountriesMarkup(countries);
    } else {
        emptyMarkup(refs.infoEl);
        refs.listEl.innerHTML = listCountriesMarkup(countries);
    }
}

function listCountriesMarkup(countries) {
    return countries.map(({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="50" height="40">${name.official}</li>`)
    .join(''); 
};

function infoCountriesMarkup({ name, capital, population, flags, languages }) {
    return `<h1><img src="${flags.png}" alt="${
        name.official
      }" width="50" height="50">${name.official}</h1>
      <p>Capital: <span>${capital}</span></p>
      <p>Population: <span> ${population}</span></p>
      <p>Languages: <span> ${Object.values(languages)}</span></p>` 
}


