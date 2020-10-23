const setToLocalSt = () => {
  let data = "";
  data = JSON.stringify(favouriteList); //para convertir  array ahora...
  //array convertido en string
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
