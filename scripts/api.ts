const getAllData = async () => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const jsonData = await response.json();
  const data = await jsonData;
  return {...data};
};

const getCountryData = (country: string) => {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  });
};

const getRegionData = (region: string) => {
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data;
  });
};

export { getAllData, getCountryData, getRegionData };