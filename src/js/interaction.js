const paintFavs = () => {};

const handleFav = (event) => {
  //añadir/quitar la serie como objeto a un array de favoritos
  //tengo el id del show aquí... event.currentTarget.dataset["id"];

  const objShowClicked = searchList.find(
    (show) => show.id == event.currentTarget.dataset["id"]
  );

  //show encontrado en objShowClicked y es el que hay que introducir en el array de favs. SI no está o quitarlo si está

  //la primera vez, push directamente
  if (favouriteList.length == 0) {
    console.log("primera vez");
    console.log(objShowClicked);
    //favouriteList.push(fav); //NO VA!
    favouriteList[0] = objShowClicked;
    console.log(favouriteList);
  } else {
    // a partir de que haya contenido buscarlo ahora en array favs para introducirlo o borrarlo..
    const index = favouriteList.findIndex(
      (show) => show.id === objShowClicked.id
    );
    // show.id == fav.id); //si no está devuelve -1
    console.log("index", index);
    if (index === -1) {
      //añadirlo al array
      console.log("añadirlo");
      //favouriteList.push(fav); //NO VA!
      favouriteList[favouriteList.length] = objShowClicked;
    } else {
      //quitarlo del array...
      favouriteList.splice(index, 1);
    }
  }
  //pintar Favoritos con modificaciones.
  // paintFavs();
  console.log(favouriteList);
};

const listenFilms = () => {
  //recogo todos los li's pintados anteriormente.
  const showsToListen = document.querySelectorAll(".js-main-search__item");
  for (const show of showsToListen) {
    show.addEventListener("click", handleFav);
  }
};
