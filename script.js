'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}


//Function that holds our HTML - it will be reused
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
          </article>
  
  `
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
/*
const getCountryData = function (country) {



const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send(); // Sending our request;

request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);//This is used to point to the event
    console.log(data);

    const html = `
<article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>;

`
countriesContainer.insertAdjacentHTML('beforeend', html);
countriesContainer.style.opacity = 1;
})
}



getCountryData('usa');

getCountryData('portugal');

*/

/*

const getCountryAndNeighbour = function (country) {

  // AJAX call for the first country
  const request = new XMLHttpRequest();
  request.open('GET', );
  request.send(); // Sending our request;
  
  request.addEventListener('load', function() {
      const [data] = JSON.parse(this.responseText);//This is used to point to the event
      console.log(data);

    // Render country 1
     renderCountry(data);

    // Get neighbour country
    const [neighbour] = data.borders;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send(); // Sending our request;

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, "neighbour")
    })
  })
  }
  
  
  
  getCountryAndNeighbour('ecuador')
  
  */


// GET COUNTRY DATA USING THE PROMISES

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then(data => {
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];

    if(!neighbour) return;

    //country 2
    return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
  })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err.message}. Try again`)
    })
};

btn.addEventListener('click', function (){
  getCountryData('portugal');
})
