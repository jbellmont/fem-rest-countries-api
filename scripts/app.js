"use strict";
var getCountryData = function (country) {
    fetch("https://restcountries.eu/rest/v2/name/" + country)
        .then(function (response) { return response.json(); });
};
var getRegionData = function (region) {
    fetch("https://restcountries.eu/rest/v2/region/" + region)
        .then(function (response) { return response.json(); });
};
// Render country-items
var createCountryItem = function (country) {
    var _a;
    var newItem = document.createElement('div');
    newItem.classList.add('country-grid-item');
    newItem.innerHTML = "\n    <div class=\"country-flag\"><img src=\"" + country.flag + "\" alt=\"" + country.name + " flag\"></div>\n    <div class=\"country-text\">\n      <h2>" + country.name + "</h2>\n      <ul>\n        <li><span class=\"country-metric-strong\">Population: </span>" + country.population + "</li>\n        <li><span class=\"country-metric-strong\">Region: </span>" + country.region + "</li>\n        <li><span class=\"country-metric-strong\">Capital: </span>" + country.capital + "</li>\n      </ul>\n    </div>\n  ";
    (_a = document.querySelector('.country-grid-container')) === null || _a === void 0 ? void 0 : _a.append(newItem);
};
var renderAllCountries = function () {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var country = data_1[_i];
            createCountryItem(country);
        }
    });
};
renderAllCountries();
