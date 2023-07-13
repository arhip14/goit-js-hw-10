import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import './styles.css';

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
    searchPlaceholder: 'Search breeds...',
    allowDeselect: true,
    deselectLabel: '&#10005; Clear selection',
    closeOnSelect: true,
    showContent: 'down',
    onChange: breed => {
      if (breed) {
        fetchCatInfo(breed.value);
      } else {
        hideCatInfo();
      }
    }
  });

  function populateBreeds() {
    showLoader();

    fetchBreeds()
      .then(breeds => {
        breeds.forEach(breed => {
          select.addData({
            value: breed.id,
            text: breed.name,
          });
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

  function showLoader() {
    loaderWrapper.style.display = "block";
    Notiflix.Loading.init({ svgColor: "#ffffff" }).standard("Loading data, please wait...");
  }

  function hideLoader() {
    loaderWrapper.style.display = "none";
    Notiflix.Loading.remove();
  }

  function showError() {
    errorWrapper.style.display = "block";
    Notiflix.Report.failure("Error", "Oops! Something went wrong! Try reloading the page!", "OK");
  }

  function hideError() {
    errorWrapper.style.display = "none";
    Notiflix.Report.remove();
  }

  function showCatInfo() {
    catInfo.style.display = "block";
  }

  function hideCatInfo() {
    catInfo.style.display = "none";
  }

  populateBreeds();
});
