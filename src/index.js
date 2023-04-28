import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    countryList: document.querySelector('country-list'),
    countryInfo: document.querySelector('country-info'),
    input: document.querySelector('#search-box'),
};

refs.input.addEventListener('click', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e){
    let searchedCountry = e.target.value.trim().toLowerCase();

    if (searchedCountry.length === 0) {
        clearMarkup();
        return;
    };

    fetchCountries(searchedCountry)
    .then(countryLimitOnPage)
    .catch(onError);
};

function countryLimitOnPage(data) {
    if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        clearMarkup();
    } else if (data.length >= 2 && data.length <= 10) { 
        listOfFoundedCountries();
        return;
    } else {
        uniqueCountryName();
        return;
    }
};


function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
};


function listOfFoundedCountries(countriesList) {
    const markup = countriesList
        .map(({ flags, name }) => {
            return `<li class="country-item">
        <img class="country-flag" src="${flags.svg}" alt="flags" width = "50" height = "30">
        <h2 class="country-name">${name.official}</h2> 
        </li>`;
        })
        .join('');
    clearMarkup();
    return refs.countryList.insertAdjacentElement('beforeend', markup);
};


function uniqueCountryName(countriesList) {
    const markup = countriesList
        .map(({ name, capital, population, flags, languages }) => {
        return `<div class="country-header">
        <img class="country-flag" src="${flags.svg}" alt="flags" width = "30" height = "20">
            <h2 >${name.official}</h2> 
            </div>            
            <ul class="country-info">
            <li class="country-item"> <b>Capital</b>:
          <span class="country-span">${capital}</span>
            </li>
            <li class="country-item"> <b>Population</b>:
          <span class="country-span">${population}</span>
            </li>
            <li class="country-item"> <b>Languages</b>:
          <span class="country-span">${Object.values(languages).join(', ')}</span>
            </li>
            </ul>`;
        })
        .join('');
    clearMarkup();
    return refs.countryList.insertAdjacentElement('beforeend', markup);
};


function clearMarkup() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
};
