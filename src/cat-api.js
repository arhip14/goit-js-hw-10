
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_xi6ut4IHugzyv9uYHHsYP2Wmh4KO3WaWT1cxm3uIKAYDyAUNuvqR15zLb5hIc2kr";

export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(`Failed to fetch cat breeds: ${error.message}`);
      throw new Error(`Failed to fetch cat breeds: ${error.message}`);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(`Failed to fetch cat by breed: ${error.message}`);
      throw new Error(`Failed to fetch cat by breed: ${error.message}`);
    });
}
