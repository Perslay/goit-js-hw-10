import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, selectInput, fetchCatByBreed } from './cat-api.js';

const loadingParag = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

loadingParag.classList.add('hidden');

try {
  fetchBreeds().then(breeds => {
    new SlimSelect({
      select: '.breed-select',
      settings: {
        placeholderText: 'Cat Breed Name',
      },
      data: breeds,
    });
  });
} catch (error) {
  console.log(error);
}

function onSelect(e) {
  if (!e.target.value) return;
  loadingParag.classList.remove('hidden');

  fetchCatByBreed(e.target.value)
    .then((catInfo.innerHTML = ''))
    // .then(data => showCat(data[0]))
    // .catch(() => {
    //   loadingParag.classList.add('hidden');
    //   Notiflix.Notify.failure(
    //     'No cat data found for the selected breed. Try choosing another cat!'
    //   );
    // });
    .then(data => {
      const catData = data[0];
      showCat(catData);
    })
    .catch(() => {
      loadingParag.classList.add('hidden');
      Notiflix.Notify.failure(
        'Cat information error. Try choosing another breed!'
      );
    });
}

selectInput.addEventListener('change', onSelect);

function showCat(info) {
  const { name, description, temperament } = info.breeds[0];
  const { url } = info;
  const inserted = `
  <img class='image' src="${url}" alt="${name}}" />
  <h2 class='second-heading'>${name}</h2>
  <p class='paragraph'><strong class='strong'>Temperament: </strong>${temperament}</p>
  <p class='paragraph'>${description}</p>
  `;
  catInfo.insertAdjacentHTML('beforeend', inserted);

  loadingParag.classList.add('hidden');
}
