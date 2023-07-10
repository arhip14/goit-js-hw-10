const catInfo = document.createElement("div");
catInfo.id = "cat-info";
catInfo.style.display = "none";

const catImage = document.createElement("img");
catImage.id = "cat-image";
catImage.alt = "Cat Image";

const catBreed = document.createElement("h2");
catBreed.id = "cat-breed";
catBreed.textContent = "Breed: ";

const catDescription = document.createElement("p");
catDescription.id = "cat-description";
catDescription.textContent = "Description: ";

const catTemperament = document.createElement("p");
catTemperament.id = "cat-temperament";
catTemperament.textContent = "Temperament: ";

catInfo.appendChild(catImage);
catInfo.appendChild(catBreed);
catInfo.appendChild(catDescription);
catInfo.appendChild(catTemperament);

document.body.appendChild(catInfo);
