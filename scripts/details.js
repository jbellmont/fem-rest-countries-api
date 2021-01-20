import { getQuery } from './app.js';
var createCountryDetails = function (country) {
    document.querySelector('.country-details-container').innerHTML = "\n    <div class=\"country-details-flag\"><img src=\"" + country.flag + "\" alt=\"" + country.name + " flag\"></div>\n    <div class=\"country-details-text\">\n      <h2>" + country.name + "</h2>\n      <div class=\"country-details-text-info\">\n        <div class=\"country-details-text-info-col-1\">\n          <ul>\n            <li><span class=\"country-metric-strong\">Native Name: </span> " + country.nativeName + "</li>\n            <li><span class=\"country-metric-strong\">Population: </span> " + country.population + "</li>\n            <li><span class=\"country-metric-strong\">Region: </span> " + country.region + "</li>\n            <li><span class=\"country-metric-strong\">Sub Region: </span> " + country.subregion + "</li>\n            <li><span class=\"country-metric-strong\">Capital: </span> " + country.capital + "</li>\n          </ul>\n        </div>\n        <div class=\"country-details-text-info-col-2\">\n          <ul>\n            <li><span class=\"country-metric-strong\">Top Level Domain: </span> " + country.topLevelDomain + "</li>\n            <li><span class=\"country-metric-strong\">Currencies: </span> " + country.currencies + "</li>\n            <li><span class=\"country-metric-strong\">Language: </span> " + country.languages + "</li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"country-details-text-border-countries\">\n        <h3>Border Countries:</h3>\n        <div class=\"country-details-button-container\">\n          <button class=\"btn\" onclick=\"location.href='?countryDetails=france';\">France</button>\n          <button class=\"btn\" onclick=\"location.href='?countryDetails=france';\">France</button>\n          <button class=\"btn\" onclick=\"location.href='?countryDetails=france';\">France</button>\n        </div>\n      </div>\n    </div>\n  ";
};
var renderCountryDetails = function (query) {
    fetch("https://restcountries.eu/rest/v2/name/" + query)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        createCountryDetails(data[0]);
    });
};
var onDetailsStartUp = function () {
    var country = getQuery();
    console.log(country);
    renderCountryDetails(country[1]);
};
onDetailsStartUp();
