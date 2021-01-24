import { getQuery, API } from './app.js';

const createCountryDetails = (country: API): void => {
  // Regex for adding commas to numbers - https://stackoverflow.com/questions/721304/insert-commas-into-number-string
  document.querySelector('.country-details-container')!.innerHTML = `
    <div class="country-details-flag"><img src="${country.flag}" alt="${country.name} flag"></div>
    <div class="country-details-text">
      <h2>${country.name}</h2>
      <div class="country-details-text-info">
        <div class="country-details-text-info-col-1">
          <ul>
            <li><span class="country-metric-strong">Native Name: </span> ${country.nativeName}</li>
            <li><span class="country-metric-strong">Population: </span> ${country.population.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}</li>
            <li><span class="country-metric-strong">Region: </span> ${country.region}</li>
            <li><span class="country-metric-strong">Sub Region: </span> ${country.subregion}</li>
            <li><span class="country-metric-strong">Capital: </span> ${country.capital}</li>
          </ul>
        </div>
        <div class="country-details-text-info-col-2">
          <ul>
            <li><span class="country-metric-strong">Top Level Domain: </span> ${country.topLevelDomain}</li>
            <li><span class="country-metric-strong">Currencies: </span> ${country.currencies[0].name}</li>
            <li><span class="country-metric-strong">Languages: </span> ${country.languages.map(lang => ' ' + lang.name)} </li>
          </ul>
        </div>
      </div>
      <div class="country-details-text-border-countries">
        <h3>Border Countries:</h3>
        <div class="country-details-button-container">

        </div>
      </div>
    </div>
  `;
};

const createBorderButton = (countryName: string): void => {
  const newButton: HTMLButtonElement = document.createElement('button');
  newButton.addEventListener('click', () => location.href=`?countryDetails=${countryName}`);
  newButton.classList.add('btn', 'btn-bc');
  newButton.innerText = `${countryName}`;
  document.querySelector('.country-details-button-container')?.append(newButton);
};

const renderCountryDetails = (query: string): void => {
  fetch(`https://restcountries.eu/rest/v2/name/${query}`)
    .then(response => response.json())
    .then(data => {
      createCountryDetails(data[0]);

      if (data[0].borders.length === 0) {
        // if no border countries...
        const borderCountryDiv: HTMLElement = <HTMLElement>document.querySelector('.country-details-text-border-countries');
        borderCountryDiv.style.display = 'none';
      } else {
        // destructure data[0].borders into new array
        const borderCodes: string[] = [...data[0].borders];

        // create new URL and forEach code, append it to end of URL, 
        let getURL = 'https://restcountries.eu/rest/v2/alpha?codes=';
        borderCodes.forEach(code => {
          if (code !== borderCodes[borderCodes.length - 1]) {
            getURL = getURL + code + ';';
          } else {
            getURL = getURL + code;
          }
        });

        // new GET request for border countries only
        fetch(getURL)
          .then(response => response.json())
          .then(data => {
            const countries: API[] = [...data];
            countries.forEach(country => createBorderButton(country.name));
          });
      }
    });
};

const onDetailsStartUp = () => {
  const country = getQuery();
  renderCountryDetails(country[1]);
};

onDetailsStartUp();