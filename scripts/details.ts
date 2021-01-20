import { getQuery, API } from './app.js';

const createCountryDetails = (country: API): void => {
  document.querySelector('.country-details-container')!.innerHTML = `
    <div class="country-details-flag"><img src="${country.flag}" alt="${country.name} flag"></div>
    <div class="country-details-text">
      <h2>${country.name}</h2>
      <div class="country-details-text-info">
        <div class="country-details-text-info-col-1">
          <ul>
            <li><span class="country-metric-strong">Native Name: </span> ${country.nativeName}</li>
            <li><span class="country-metric-strong">Population: </span> ${country.population}</li>
            <li><span class="country-metric-strong">Region: </span> ${country.region}</li>
            <li><span class="country-metric-strong">Sub Region: </span> ${country.subregion}</li>
            <li><span class="country-metric-strong">Capital: </span> ${country.capital}</li>
          </ul>
        </div>
        <div class="country-details-text-info-col-2">
          <ul>
            <li><span class="country-metric-strong">Top Level Domain: </span> ${country.topLevelDomain}</li>
            <li><span class="country-metric-strong">Currencies: </span> ${country.currencies}</li>
            <li><span class="country-metric-strong">Language: </span> ${country.languages}</li>
          </ul>
        </div>
      </div>
      <div class="country-details-text-border-countries">
        <h3>Border Countries:</h3>
        <div class="country-details-button-container">
          <button class="btn" onclick="location.href='?countryDetails=france';">France</button>
          <button class="btn" onclick="location.href='?countryDetails=france';">France</button>
          <button class="btn" onclick="location.href='?countryDetails=france';">France</button>
        </div>
      </div>
    </div>
  `;
};

const renderCountryDetails = (query: string): void => {
  fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(response => response.json())
    .then(data => {
      createCountryDetails(data[0]);
    });
};

const onDetailsStartUp = () => {
  const country = getQuery();
  console.log(country);
  renderCountryDetails(country[1]);
};

onDetailsStartUp();