"use strict";
// Render country-items functions
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
var renderSearchResults = function (query) {
    fetch("https://restcountries.eu/rest/v2/name/" + query)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var country = data_2[_i];
            createCountryItem(country);
        }
    });
};
var renderFilterResult = function (region) {
    fetch("https://restcountries.eu/rest/v2/region/" + region)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
            var country = data_3[_i];
            createCountryItem(country);
        }
    });
};
// On page-load scripts
var onStartUp = function () {
    var searchQuery = getQuery();
    // If no query, show all countries
    if (!searchQuery[0]) {
        renderAllCountries();
        // Country search query
    }
    else if (searchQuery[0] === '?country') {
        renderSearchResults(searchQuery[1]);
        // Region filter
    }
    else {
        renderFilterResult(searchQuery[1]);
    }
};
// Returns the search query string
var getQuery = function () {
    return window.location.search.split('=');
};
onStartUp();
