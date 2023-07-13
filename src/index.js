const catInfo = `

  <div id="cat-info" style="display: none;">
    <img id="cat-image" alt="Cat Image">
    <h2 id="cat-breed">Breed: </h2>
    <p id="cat-description">Description: </p>
    <p id="cat-temperament">Temperament: </p>
  </div>

  <div class="container">
    <h1>Cat Breeds</h1>

    <div class="loader-wrapper">
      <div class="cssload-loader"></div>
    </div>

    <div class="error-wrapper"></div>

    <select id="breed-select"></select>
  </div>

`;

document.body.insertAdjacentHTML("beforeend", catInfo);