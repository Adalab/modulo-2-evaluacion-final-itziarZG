"use strict";

//elementos a "escuchar"
const buttonEl = document.querySelector(".js-main__button");

//array global del resultado búsqueda
let searchList = [];
//array global del listado favoritas
// let favouriteList = [];

const isFavorite = (favId) => {
  //recorreré el array de favoritos para saber si está..
  for (const show of favouriteList) {
    if (show.id == favId) return true;
  }
};

const paintFilms = () => {
  //busco el elemento ul de la sección de resultados
  const filmsSection = document.querySelector(".js-main__search__list");

  //borro lo anterior si hubiera
  filmsSection.innerHTML = "";

  //pintar elemento a elemento del array searchList
  for (const show of searchList) {
    //cada serie será una 'li' con una img y un texto y clase js-main-search__item

    //creación de todos los nodos  PASAR A FUNCION!
    const showEl = document.createElement("li");
    showEl.classList.add("js-main__search__item", "main__search__item");
    const imgEl = document.createElement("img");
    imgEl.classList.add("js-main__search__photo");
    const showNameText = document.createTextNode(show.name);
    const showNameEl = document.createElement("p");
    showNameEl.classList.add("js-main__search__text");

    //creación de los elementos
    showNameEl.appendChild(showNameText);
    imgEl.setAttribute("src", show.url);

    //creación del li con esos dos elementos
    showEl.appendChild(imgEl);
    showEl.appendChild(showNameEl);

    //SI ES FAVORITA modificar atributos del li

    if (isFavorite(show.id)) {
      showEl.style.color = "grey";
      showEl.style.backgroundColor = "blueviolet";
    }

    //añado mi data-id para reconocerlo después al incluirlo en favs.
    showEl.dataset["id"] = show.id;
    //lo añadimos a ul
    filmsSection.appendChild(showEl);
  }
  listenFilms();
};

//función que realiza la petició a API con la palabra que ha introducido el usuario
const getData = (word) => {
  const url = `//api.tvmaze.com/search/shows?q=${word}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //parseo sólo info que necesito
      //borro la anterior, si hubiera
      searchList = [];
      for (const object of data) {
        let imgURL = "";
        //comprobación de la url para porner la de por defecto.
        if (object.show.image === null) {
          const text = object.show.name.toUpperCase();
          imgURL = `//via.placeholder.com/210x295/CCCCCC/666666/?text=${text}`;
        } else {
          imgURL = object.show.image.medium;
        }
        const newShow = {
          name: object.show.name,
          id: object.show.id,
          url: imgURL,
        };

        //añado el nuevo objeto al array de resultado búsqueda.
        searchList.push(newShow);
      }

      paintFilms(); // "pinta" los elementos del array searchList y los escucha..
    });
};

//función manejadora de la búsqueda... llama a getData para el fetch con la palabra clave...
const handleClick = (ev) => {
  ev.preventDefault(); // para que  no recargue la página en seguida...
  const inputEl = document.querySelector(".js-main__input"); //escucho ahora el elemento input para tener el valor cuando el click
  const word = inputEl.value;

  if (!!word) getData(word); //si el usuario no ha introducido texto, no buscamos nada
};

//starting app with listener and looking LocalSt
buttonEl.addEventListener("click", handleClick);
getFromLocalSt();
