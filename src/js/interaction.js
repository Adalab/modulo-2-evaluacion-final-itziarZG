const paintFavs = () => {
  //busco el elemento ul de la sección favoritos
  const favSection = document.querySelector(".js-main__fav__list");

  //borro lo anterior si hubiera
  favSection.innerHTML = "";

  //pintar elemento a elemento del array favList
  for (const show of favouriteList) {
    //cada serie será una 'li' con una img,un botón con clase js-main-fav-remove y un texto.

    //creación de todos los nodos
    const showEl = document.createElement("li");
    showEl.classList.add("js-main__fav__item", "main__fav__item");
    const imgEl = document.createElement("img");
    imgEl.classList.add("js-main__fav__photo");
    const showNameText = document.createTextNode(show.name);
    const showNameEl = document.createElement("p");
    showNameEl.classList.add("js-main-fav__text");
    const delBtnEl = document.createElement("div");
    const delBtnCont = document.createTextNode("X");

    //creación de los elementos
    showNameEl.appendChild(showNameText);
    imgEl.setAttribute("src", show.url);
    delBtnEl.appendChild(delBtnCont);
    //añado la clase main__fav__btn para escuchar después.
    delBtnEl.classList.add("js-main__fav__btn");

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
};

const handleFav = (event) => {
  //añadir/quitar la serie como objeto a un array de favoritos
  //tengo el id del show aquí... event.currentTarget.dataset["id"];

  const objShowClicked = searchList.find(
    (show) => show.id == event.currentTarget.dataset["id"]
  );

  //show encontrado en objShowClicked y es el que hay que introducir en el array de favs. SI no está o quitarlo si está

  //la primera vez, push directamente
  if (favouriteList.length == 0) {
    // console.log("primera vez");
    // console.log(objShowClicked);
    //favouriteList.push(fav); //NO VA!
    favouriteList[0] = objShowClicked;
    // console.log(favouriteList);
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
  paintFilms();
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
  //pintar Favoritos con modificaciones.
  paintFavs();
  paintFilms();
  // parseInt();
  setToLocalSt();
};

const listenButFavs = () => {
  //recogo todos los li's pintados anteriormente.
  const showsToListen = document.querySelectorAll(".js-main__fav__btn");
  for (const show of showsToListen) {
    show.addEventListener("click", handleDelFav);
  }
};

const listenFilms = () => {
  //recogo todos los li's pintados anteriormente.
  const showsToListen = document.querySelectorAll(".js-main__search__item");
  for (const show of showsToListen) {
    show.addEventListener("click", handleFav);
  }
};
