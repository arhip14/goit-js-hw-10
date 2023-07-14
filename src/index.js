import Notiflix from "notiflix";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showCatInfo() {
  catInfo.style.display = "block";
}

function hideCatInfo() {
  catInfo.style.display = "none";
}

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");

catInfo.style.display = "none";
loader.style.display = "none";

fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    new SlimSelect({
      select: ".breed-select",
      placeholder: "Choose cat breed :)",
    });
  })
  .catch((error) => {
    Notiflix.Notify.failure(error);
  });

breedSelect.addEventListener("change", () => {
  const breedId = breedSelect.value;
  showLoader();
  hideCatInfo();

  fetchCatByBreed(breedId)
    .then((catData) => {
      hideLoader();
      if (catData.length === 0) {
        return Notiflix.Notify.warning("Sorry, nothing was found :(");
      }

      showCatInfo();
      const imageUrl = catData[0].url;
      const catDescr = catData[0].breeds[0].description;
      const catTemp = catData[0].breeds[0].temperament;

      const markup = `
        <img class="img-cat" src="${imageUrl}">
        <div class="inf">
        <p class="cat-inf"><a>Description:</a>${catDescr}</p>
        <p class="cat-inf"><a>Temperament:</a>${catTemp}</p>
        </div>
      `;
      catInfo.innerHTML = markup;
    })
    .catch((error) => {
      hideLoader();
      Notiflix.Notify.failure(error);
    });
});

