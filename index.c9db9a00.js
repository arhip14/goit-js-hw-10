!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var c={id:e,exports:{}};return t[e]=c,o.call(c.exports,c,c.exports),c.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var c=o("eWrZJ");document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("breed-select"),t=document.querySelector(".loader"),n=document.querySelector(".error"),o=document.getElementById("cat-info"),r=document.getElementById("cat-image"),d=document.getElementById("cat-breed"),i=document.getElementById("cat-description"),l=document.getElementById("cat-temperament");function a(e){u(),n.style.display="none",(0,c.fetchCatByBreed)(e).then((function(e){if(e.length>0){var t=e[0];r.src=t.url,d.textContent="Breed: ".concat(t.breeds[0].name),i.textContent="Description: ".concat(t.breeds[0].description),l.textContent="Temperament: ".concat(t.breeds[0].temperament),o.style.display="block"}else s()})).catch((function(e){console.error(e),s()})).finally((function(){f()}))}function u(){t.style.display="block"}function f(){t.style.display="none"}function s(){n.style.display="block"}e.addEventListener("change",(function(e){a(e.target.value)})),u(),(0,c.fetchBreeds)().then((function(t){t.forEach((function(t){var n=document.createElement("option");n.value=t.id,n.text=t.name,e.appendChild(n)}))})).catch((function(e){console.error(e),s()})).finally((function(){f()}))}))}();
//# sourceMappingURL=index.c9db9a00.js.map