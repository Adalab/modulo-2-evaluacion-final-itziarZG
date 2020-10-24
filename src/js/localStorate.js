const setToLocalSt = () => {
  let data = "";
  data = JSON.stringify(favouriteList); //para convertir  el array a string...
  //array convertido en string a local storage
  localStorage.setItem("favs", data);
};

const getFromLocalSt = () => {
  //sacar de localSt si hay

  if (localStorage.getItem("favs") != null) {
    const data = JSON.parse(localStorage.getItem("favs"));
    favouriteList = data;
    paintFavs();
    listenButFavs();
  }
};
