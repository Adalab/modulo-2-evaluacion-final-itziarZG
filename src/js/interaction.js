const paintFavs = () => {
  //busco el elemento ul de la sección favoritos donde pintaré
  const favSection = document.querySelector(".js-main__fav__list");

  //borro lo anterior si hubiera
  favSection.innerHTML = "";

  //creación del titutlo de la sección
  if (favouriteList.length != 0) {
    const titleEl = document.createElement("h2");
    const titleText = document.createTextNode("Mis series favoritas");
    titleEl.appendChild(titleText);
    titleEl.classList.add("main__fav__title");
    favSection.appendChild(titleEl);
  }
  //pintar elemento a elemento del array favList
  for (const show of favouriteList) {
    //cada serie será una 'li' con una img,un botón con clase js-main-fav-remove y un texto.

    //creación del li
    const showEl = document.createElement("li");
    showEl.classList.add("js-main__fav__item", "main__fav__item"); //clases del li
    const imgEl = document.createElement("img");
    imgEl.classList.add("main__fav__photo"); //clase de la img
    const showNameText = document.createTextNode(show.name); //texto del p nombre
    const showNameEl = document.createElement("p");
    showNameEl.classList.add("main__fav__text"); // clase del nombre
    const delBtnEl = document.createElement("div"); //minibotón X para quitarlo de favoritos.
    const delBtnCont = document.createTextNode("X");

    //creación de los elementos "totales"
    showNameEl.appendChild(showNameText);
    imgEl.setAttribute("src", show.url);

    delBtnEl.appendChild(delBtnCont);
    //añado la clase main__fav__btn para escuchar después.
    delBtnEl.classList.add("js-main__fav__btn", "main__fav__btn");

    //creación del li con esos 3 elementos
    showEl.appendChild(imgEl);
    showEl.appendChild(showNameEl);
    showEl.appendChild(delBtnEl);

    //añado mi data-id para reconocerlo después al incluirlo en favs.
    showEl.dataset["id"] = show.id;
    //lo añadimos a ul
    favSection.appendChild(showEl);
  }
  listenButFavs();

  //si no hay favoritos no quiero el botón de borrar todos
  if (favSection.hasChildNodes()) {
    //Añadir botón de borrar toda lista
    const butEl = document.createElement("button");
    const butText = document.createTextNode("Borrar todas");
    butEl.classList.add("js-main__favs__del", "main__favs__del");
    butEl.appendChild(butText);

    favSection.append(butEl);
    listenButDel();
  }
};

const rePaintFilm = (id) => {
  id = parseInt(id);
  const search = document.querySelector(".js-main__search__list");
  const showLi = search.querySelector(`[data-id="${id}"`);

  // buscar si showLi está en favoritos. para quitarle los nuevos atributos...
  if (isFavorite(id)) {
    //borrar atributos anteriores..
    showLi.removeAttribute("style");
  } else {
    // o ponérselos...
    showLi.style.color = "grey";
    showLi.style.backgroundColor = "blueviolet";
  }
};

const handleFav = (event) => {
  //añadir/quitar la serie como objeto a un array de favoritos
  //tengo el id del show aquí...event.currentTarget.dataset["id"];

  const objShowClicked = searchList.find(
    (show) => show.id == event.currentTarget.dataset["id"]
  );

  //show encontrado en objShowClicked y es el que hay que introducir en el array de favs SI no está o quitarlo si está

  //Antes de tocar array favourites pintar las modificaciones en la lista de búsqueda.
  rePaintFilm(event.currentTarget.dataset["id"]);

  //la primera vez, push directamente
  if (favouriteList.length == 0) {
    //favouriteList.push(fav); //NO VA!
    favouriteList[0] = objShowClicked;
  } else {
    // a partir de que haya contenido buscarlo ahora en array favs para introducirlo o borrarlo..
    const index = favouriteList.findIndex(
      (show) => show.id === objShowClicked.id
    );

    //si no está devuelve -1
    if (index === -1) {
      //añadirlo al array
      //favouriteList.push(fav); //NO VA!
      favouriteList[favouriteList.length] = objShowClicked;
    } else {
      //quitarlo del array...
      favouriteList.splice(index, 1);
    }
  }
  //pintar Favoritos con modificaciones,guardarlo y volver a escuchar...
  paintFavs();
  setToLocalSt();
};

const handleDelFav = (event) => {
  //quitar la serie del array de favoritos
  //en este caso, al clickar botón, tenemos que ir al elemento padre, el li.
  //tengo el id ahí... event.currentTarget.parentElement).dataset["id"];
  const clickedId = event.currentTarget.parentElement.dataset["id"];
  const indexClicked = favouriteList.findIndex((show) => show.id == clickedId);

  //quitarlo del array...
  favouriteList.splice(indexClicked, 1);

  // comprobar si se ha vaciado la lista para borrar el título y el local storage
  if (favouriteList.length == 0) {
    handleDelAll(); //ya que equivale a haber borrado todas pero de una en euna...
  }
  //pintar Favoritos con modificaciones.
  paintFavs();
  setToLocalSt();
  //pintar modificaciones en lista búsqueda...
  paintFilms();
};
const handleDelAll = () => {
  favouriteList = [];
  paintFilms();
  paintFavs();
  localStorage.clear();
  //si no hay lista de favoritos, quiero quitar el texto tmb
  const favSection = document.querySelector(".js-main__fav__list");
  favSection.innerHTML = "";
};

const listenButFavs = () => {
  //recogo todos los li's pintados anteriormente.
  const showsToListen = document.querySelectorAll(".js-main__fav__btn");
  for (const show of showsToListen) {
    show.addEventListener("click", handleDelFav);
  }
};

const listenButDel = () => {
  const buttEl = document.querySelector(".js-main__favs__del");
  buttEl.addEventListener("click", handleDelAll);
};

const myconsole = (ev) => {
  const id = ev.currentTarget.dataset["id"];
  const serie = searchList.find((serie) => {
    if (serie.id === parseInt(id)) {
      console.log("entro if");
      return serie.name;
    }
  });
  console.log("la serie clickada es ", serie);
};

const listenFilms = () => {
  //recogo todos los li's pintados anteriormente.
  const showsToListen = document.querySelectorAll(".js-main__search__item");
  for (const show of showsToListen) {
    show.addEventListener("click", myconsole);
  }
};
