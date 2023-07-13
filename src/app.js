import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import axios from "axios";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import './styles.css';

axios.defaults.headers.common["x-api-key"] = "live_xi6ut4IHugzyv9uYHHsYP2Wmh4KO3WaWT1cxm3uIKAYDyAUNuvqR15zLb5hIc2kr";

document.addEventListener("DOMContentLoaded", function() {
  const breedSelect = document.getElementById("breed-select");
  const loaderWrapper = document.querySelector(".loader-wrapper");
  const errorWrapper = document.querySelector(".error-wrapper");
  const catInfo = document.getElementById("cat-info");
  const catImage = document.getElementById("cat-image");
  const catBreed = document.getElementById("cat-breed");
  const catDescription = document.getElementById("cat-description");
  const catTemperament = document.getElementById("cat-temperament");

  const select = new SlimSelect({
    select: breedSelect,
    placeholder: 'Select a breed',
    allowDeselect: true,
    showSearch: false,
    onChange: function(info) {
      const selectedBreedId = info.value;
      fetchCatInfo(selectedBreedId);
    },
  });

  function populateBreeds() {
    showLoader();

    fetchBreeds()
      .then(breeds => {
        breeds.forEach(breed => {
          const option = document.createElement("option");
          option.value = breed.id;
          option.text = breed.name;
          breedSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error(error);
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  }

  function fetchCatInfo(breedId) {
    showLoader();
    hideError();

    fetchCatByBreed(breedId)
      .then(cats => {
        if (cats.length > 0) {
          const cat = cats[0];
          catImage.src = cat.url;
          catBreed.textContent = `Breed: ${cat.breeds[0].name}`;
          catDescription.textContent = `Description: ${cat.breeds[0].description}`;
          catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

          showCatInfo();
        } else {
          showError();
        }
      })
      .catch(error => {
        console.error(error);
        showError();
      })
      .finally(() => {
        hideLoader();
      });
  }

  breedSelect.addEventListener("change", event => {
    const selectedBreedId = event.target.value;
    fetchCatInfo(selectedBreedId);
  });

  function showLoader() {
    loaderWrapper.style.display = "block";
    loaderWrapper.classList.add('cssload-loader');
  }

  function hideLoader() {
    loaderWrapper.style.display = "none";
    loaderWrapper.classList.remove('cssload-loader');
  }

  function showError() {
    errorWrapper.style.display = "block";
    Notiflix.Report.Failure('Error', 'Oops! Something went wrong! Try reloading the page!', 'OK');
  }

  function hideError() {
    errorWrapper.style.display = "none";
    Notiflix.Report.Remove();
  }

  function showCatInfo() {
    catInfo.style.display = "block";
  }

  populateBreeds();
});
