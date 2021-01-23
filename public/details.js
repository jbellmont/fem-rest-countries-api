var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { getQuery } from './app.js';
var createCountryDetails = function (country) {
    document.querySelector('.country-details-container').innerHTML = "\n    <div class=\"country-details-flag\"><img src=\"" + country.flag + "\" alt=\"" + country.name + " flag\"></div>\n    <div class=\"country-details-text\">\n      <h2>" + country.name + "</h2>\n      <div class=\"country-details-text-info\">\n        <div class=\"country-details-text-info-col-1\">\n          <ul>\n            <li><span class=\"country-metric-strong\">Native Name: </span> " + country.nativeName + "</li>\n            <li><span class=\"country-metric-strong\">Population: </span> " + country.population + "</li>\n            <li><span class=\"country-metric-strong\">Region: </span> " + country.region + "</li>\n            <li><span class=\"country-metric-strong\">Sub Region: </span> " + country.subregion + "</li>\n            <li><span class=\"country-metric-strong\">Capital: </span> " + country.capital + "</li>\n          </ul>\n        </div>\n        <div class=\"country-details-text-info-col-2\">\n          <ul>\n            <li><span class=\"country-metric-strong\">Top Level Domain: </span> " + country.topLevelDomain + "</li>\n            <li><span class=\"country-metric-strong\">Currencies: </span> " + country.currencies[0].name + "</li>\n            <li><span class=\"country-metric-strong\">Language: </span> " + country.languages[0].name + "</li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"country-details-text-border-countries\">\n        <h3>Border Countries:</h3>\n        <div class=\"country-details-button-container\">\n\n        </div>\n      </div>\n    </div>\n  ";
    // for each border country, invoke createBorderButton(country)
};
var createBorderButton = function (countryName) {
    var _a;
    var newButton = document.createElement('button');
    newButton.addEventListener('click', function () { return location.href = "?countryDetails=" + countryName; });
    newButton.classList.add('btn');
    newButton.innerText = "" + countryName;
    (_a = document.querySelector('.country-details-button-container')) === null || _a === void 0 ? void 0 : _a.append(newButton);
};
var renderCountryDetails = function (query) {
    fetch("https://restcountries.eu/rest/v2/name/" + query)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        createCountryDetails(data[0]);
        // destructure data[0].borders into new array
        var borderCodes = __spreadArrays(data[0].borders);
        // create new URL and forEach code, append it to end of URL, 
        var getURL = 'https://restcountries.eu/rest/v2/alpha?codes=';
        borderCodes.forEach(function (code) {
            if (code !== borderCodes[borderCodes.length - 1]) {
                getURL = getURL + code + ';';
            }
            else {
                getURL = getURL + code;
            }
        });
        // new GET request for border countries only
        fetch(getURL)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var countries = __spreadArrays(data);
            countries.forEach(function (country) { return createBorderButton(country.name); });
        });
    });
};
var onDetailsStartUp = function () {
    var country = getQuery();
    renderCountryDetails(country[1]);
};
onDetailsStartUp();
