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


// Render country-items functions
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

const renderAllCountries = (): void => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
      for (let country of data) {
        createCountryItem(country);
      }
    });
};

const renderSearchResults = (query: string): void => {
  fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(response => response.json())
    .then(data => {
      for (let country of data) {
        createCountryItem(country);
      }
    });
};

const renderFilterResult = (region: string): void => {
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(response => response.json())
    .then(data => {
      for (let country of data) {
        createCountryItem(country);
      }
    });
};


// On page-load scripts
const onStartUp = ():void => {
  const searchQuery = getQuery();
  // If no query, show all countries
  if (!searchQuery[0]) {
    renderAllCountries();
  // Country search query
  } else if (searchQuery[0] === '?country') {
    renderSearchResults(searchQuery[1]);
  // Region filter
  } else {
    renderFilterResult(searchQuery[1]);
  }
};

// Returns the search query string
const getQuery = (): string[] => {
  return window.location.search.split('=');
};

onStartUp();


// DOM Interactivity
const onFilterClick = (): void => {
  const filterElement: HTMLElement = <HTMLElement>document.querySelector('.filter-content');
  filterElement.style.display === 'block' ? filterElement.style.display = 'none' 
                                          : filterElement.style.display = 'block';  
};

document.querySelector('.filter-dropdown')?.addEventListener('click', onFilterClick);