import axios from 'axios';
import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select'

export const selectInput = document.querySelector('.breed-select');

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_E41oW7TQeyZPbpWGQQHegvg3I5o2ZS6Oik46a7C42PktGiUWsKCBBexsIii8F6Xa';

  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      response.data.map(cat => {
        selectInput.insertAdjacentHTML(
          'beforeend',
          `<option value="${cat.id}">${cat.name}</option>`
        );
      });
    })
    .catch(error => {
      Notiflix.Notify.failure('Something went wrong. Try reloading the page!');
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};
