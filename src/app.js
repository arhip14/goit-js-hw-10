import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.getElementById("breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.getElementById("cat-info");
const catImage = document.getElementById("cat-image");
const catBreed = document.getElementById("cat-breed");
const catDescription = document.getElementById("cat-description");
const catTemperament = document.getElementById("cat-temperament");

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
  loader.style.display = "block";
}


function hideLoader() {
  loader.style.display = "none";
}


function showError() {
  error.style.display = "block";
}


function hideError() {
  error.style.display = "none";
}


function showCatInfo() {
  catInfo.style.display = "block";
}

populateBreeds();