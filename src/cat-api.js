import axios from 'axios';
import Notiflix from 'notiflix';

export const selectInput = document.querySelector('.breed-select');
const cats = [];

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_E41oW7TQeyZPbpWGQQHegvg3I5o2ZS6Oik46a7C42PktGiUWsKCBBexsIii8F6Xa';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      response.data.map(({ id, name }) => {
        cats.push({ text: name, value: id });
      });
      return cats;
    })
    .catch(() => {
      Notiflix.Notify.failure('Something went wrong. Try reloading the page!');
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(() => {
      Notiflix.Notify.failure('Something went wrong. Try reloading the page!');
    });
};
