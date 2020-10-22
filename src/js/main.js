"use strict";

//elementos a "escuchar"
const buttonEl = document.querySelector(".js-main__button");

//array global del resultado búsqueda
let searchList = [];
//array global del listado favoritas
let favouritesList = [];

const paintFilms = () => {
  console.log("a pintar");
  //busco el elemento ul de la sección de resultados
  const filmsSection = document.querySelector(".js-main__search__list");
  console.log(filmsSection);
  //borro lo anterior si hubiera buscando si hay
  filmsSection.innerHTML = "";
  //pintar elemento a elemento del array searchList
  for (const show of searchList) {
    //cada serie será una 'li' con una img y un texto y clase js-main-search__item
    console.log("pinto una");

    //creación de todos los nodos
    const showEl = document.createElement("li");
    showEl.classList.add("js-main-search__item");
    const imgEl = document.createElement("img");
    imgEl.classList.add("js-main-search__item", "photo");
    const showNameText = document.createTextNode(show.show.name);
    const showNameEl = document.createElement("p");
    showNameEl.classList.add("js-main-search__item", "text");

    let imgURL = "";

    //comprobación de la url para porner la de por defecto.
    if (show.show.image === null)
      imgURL = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    else imgURL = show.show.image.medium;

    //creación de los elementos
    showNameEl.appendChild(showNameText);
    imgEl.setAttribute("src", imgURL);

    //creación del li con esos dos elementos
    showEl.appendChild(imgEl);
    showEl.appendChild(showNameEl);

    //lo añadimos a ul
    filmsSection.appendChild(showEl);
  }
};
//función que realiza la petició a API con la palabra que ha introducido el usuario
const getData = (word) => {
  const url = `http://api.tvmaze.com/search/shows?q=${word}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchList = data;
      paintFilms();
    });
};

//función manejadora de la búsqueda... llama a getData para el fetch con la palabra clave...
const handleClick = (ev) => {
  ev.preventDefault(); // para que  no recargue la página en seguida...
  const inputEl = document.querySelector(".js-main__input"); //escucho ahora el elemento input para tener el valor cuando el click
  const word = inputEl.value;

  if (!!word) getData(word); //si el usuario no ha introducido texto, no buscamos nada
};

//starting app with listener
buttonEl.addEventListener("click", handleClick);
