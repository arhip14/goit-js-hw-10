import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';

export function populateBreeds() {
  const breedSelect = document.getElementById("breed-select");
  const loaderWrapper = document.querySelector(".loader-wrapper");
  const errorWrapper = document.querySelector(".error-wrapper");

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

  function fetchCatInfo(breedId) {
    showLoader();
    hideError();

    fetchCatByBreed(breedId)
      .then(cats => {
        if (cats.length > 0) {
          const cat = cats[0];
          const catImage = document.getElementById("cat-image");
          const catBreed = document.getElementById("cat-breed");
          const catDescription = document.getElementById("cat-description");
          const catTemperament = document.getElementById("cat-temperament");

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
  }

  function hideLoader() {
    loaderWrapper.style.display = "none";
  }

  function showError() {
    errorWrapper.style.display = "block";
  }

  function hideError() {
    errorWrapper.style.display = "none";
  }

  function showCatInfo() {
    const catInfo = document.getElementById("cat-info");
    catInfo.style.display = "block";
  }
}
