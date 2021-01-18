interface API {
  name: string;
  topLevelDomain: [];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: [];
  capital: string;
  altSpellings: [],
  region: string;
  subregion: string;
  population: number;
  latlng: [];
  demonym: string;
  area: number;
  gini: number;
  timezones: [];
  borders: [];
  nativeName: string;
  numericCode: string;
  currencies: [];
  languages: [];
  translations: {};
  flag: string;
  regionalBlocs: [];
  cioc: string;
}

const getCountryData = (country: string) => {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json());
};

const getRegionData = (region: string) => {
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
  .then(response => response.json());
};


// Render country-items
const createCountryItem = (country: API): void => {
  const newItem: HTMLDivElement = document.createElement('div');
  newItem.classList.add('country-grid-item');
  newItem.innerHTML = `
    <div class="country-flag"><img src="${country.flag}" alt="${country.name} flag"></div>
    <div class="country-text">
      <h2>${country.name}</h2>
      <ul>
        <li><span class="country-metric-strong">Population: </span>${country.population}</li>
        <li><span class="country-metric-strong">Region: </span>${country.region}</li>
        <li><span class="country-metric-strong">Capital: </span>${country.capital}</li>
      </ul>
    </div>
  `;
  document.querySelector('.country-grid-container')?.append(newItem);
};


const renderAllCountries = () => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
      for (let country of data) {
        createCountryItem(country);
      }
    });
};

renderAllCountries();