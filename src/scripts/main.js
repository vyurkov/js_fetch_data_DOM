'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const ul = document.createElement('ul');

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

const getPhones = () => request('/phones.json');

const getPhonesDetails = (phones) => {
  const phonesWithDetails = [];

  phones.forEach(phone => {
    request(`/phones/${phone.id}.json`)
      .then(response => {
        ul.insertAdjacentHTML('beforeend', `
          <li>${response.name}</li>
        `);

        phonesWithDetails.push(
          {
            ...phone,
            details: response,
          }
        );
      });
  });

  document.body.append(ul);

  return phonesWithDetails;
};

getPhones()
  .then(result => {
    getPhonesDetails(result);
  })
  .catch(error => {
    setTimeout(() => document.body.append(error), 5000);
  });
