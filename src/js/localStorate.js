const setToLocalSt = () => {
  //convertir en cadena cada objeto serie e ir añadiéndolo, concatenándolo.
  let data = "";
  for (const show of favouriteList) {
    data += JSON.stringify(show);
  }
  console.log(data);
  data = JSON.stringify(data); //para convertir todo el array ahora...
  //array convertido en string
  localStorage.setItem("favs", data);
};

const getFromLocalSt = () => {
  //sacar de localSt si hay

  if (localStorage.getItem("favs") != null) {
    console.log("hay data");
    const data = JSON.parse(localStorage.getItem("favs"));
    console.log(data);
    //parsear el array
    //BUSCAR LAS LLAVES? Y SLICE?
    const onedata = JSON.parse(data);
    console.log(onedata);
    //parsear uno por uno los arrays de objetos...
  }
};
