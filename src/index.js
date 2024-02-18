import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select'
import {
  fetchBreeds,
  selectInput,
  fetchCatByBreed,
  errorParag,
} from './cat-api.js';

const loadingParag = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

loadingParag.classList.add('hidden');

try {
  fetchBreeds();
} catch (error) {
  console.log(error);
}

function onSelect(e) {
  loadingParag.classList.remove('hidden');
  fetchCatByBreed(e.target.value)
    .then((catInfo.innerHTML = ''))
    .then(data => showCat(data[0]))
    .catch(error => {
      loadingParag.classList.add('hidden');
      Notiflix.Notify.failure(
        'Cat information error. Try choosing another breed!'
      );
    });
  // error rasy
}

selectInput.addEventListener('change', onSelect);

function showCat(info) {
  const { name, description, temperament } = info.breeds[0];
  const { url } = info;
  const inserted = `
  <img src="${url}" alt="${name}}" />
  <h2>${name}</h2>
  <p>Temperament: ${temperament}</p>
  <p>${description}</p>
  `;
  catInfo.insertAdjacentHTML('beforeend', inserted);

  loadingParag.classList.add('hidden');
}

// slimselect biblioteke zrobic do selecta
