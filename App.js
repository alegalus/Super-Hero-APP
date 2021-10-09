window.onload = iniciar;

function iniciar() {
  let button = document.getElementById("cargarHeroes");
  button.addEventListener("click", clickJson);
  let search = document.getElementById("buscador");
  search.addEventListener("keyup", clickJson);
  
  
}

async function cargarUrl(url) {
  let response = await fetch(url);
  return response.json();
}

async function clickJson(e) {
  let nombre = document.getElementById("buscador").value;
  let minNom = nombre.toLowerCase();

  const accesToken = "108611408143224";
  let json = await cargarUrl(
    `https://www.superheroapi.com/api.php/${accesToken}/search/${nombre}`
  ); /*--Traer los datos de la Api--*/
  console.log("presiono la tecla: " + e.key + " cuyo codigo es: " + e.keyCode);
  console.log(json);
  createCard(json, minNom);
  modal(json , e)
}

function modal(json, e) {
  let notFound = json.response;
  if (notFound === "error" && e.keyCode !== 8) {
    console.log("el boton anda");
    let myModal = new bootstrap.Modal(document.getElementById("errorModal"));
    myModal.toggle();
  }
  
}

function createCard(json, minNom) {
  let datos = json.results;
  let padre = document.getElementById("fila");
  padre.innerHTML = "";
  

  for (let item in datos) {
    

    

    let main = document.createElement("div");
    //creando los elementos recorriendo los resultados
    //creando cards
    if (datos[item].name.indexOf(minNom) !== -1) {
        main.id = "main";
    }

    if (datos.length == 1) {
      main.className =
        "col-12 col-md-12 col-xl-12 d-flex flex-column align-items-center";
      console.log("es un solo elemento");
    } else if (datos.length == 2) {
      main.className =
        "col-12 col-md-6 col-xl-6 d-flex flex-column align-items-center";
      console.log("son dos elementos");
    } else {
      main.className =
        "col-12 col-md-6 col-xl-4 d-flex flex-column align-items-center";
      console.log("es mas de un elemento");
    }
    let divCard = document.createElement("div");
    divCard.id = "card6";
    divCard.className = "card";
    let divEnc = document.createElement("div");
    divEnc.id = "cardEnc";
    divEnc.className = "d-flex flex-column align-items-center";
    let tituloEnc = document.createElement("h2");
    tituloEnc.className = "cardt-tittle";

    padre.appendChild(main); // con esto le doy de quien es hijo cada uno, este va a uno el div card con el div flex
    main.appendChild(divCard);
    divCard.appendChild(divEnc);
    divEnc.appendChild(tituloEnc);

    //agregando nombre del Super Hero
    let name = datos[item].name;
    name.toLowerCase();
    let spanTit = document.createElement("span");
    spanTit.className = "nombre";
    spanTit.id = "namePlace";
    spanTit.innerHTML = name;
    tituloEnc.appendChild(spanTit);
    let br = document.createElement("br");
    divEnc.appendChild(br);
    //Agregando imagen
    let imagen = datos[item].image.url;
    let imgSup = document.createElement("img");
    imgSup.id = "imagen";
    imgSup.tagName = "imageSuper";
    imgSup.className = "card-img-top";
    imgSup.setAttribute("src", imagen);
    divEnc.appendChild(imgSup);
    //Seccion de biografia
    let bio = datos[item].biography;
    let divBio = document.createElement("div");
    divBio.className = "card-body";
    divBio.id = "datos";
    let bioSecc = document.createElement("h3");
    bioSecc.className = "card-text";
    bioSecc.id = "biografia";
    bioSecc.textContent = "Biografia";
    divCard.appendChild(divBio);
    divBio.appendChild(bioSecc);
    //Alter ego
    let alterEgo = bio["full-name"];
    let parrAlter = document.createElement("p");
    parrAlter.className = "card-text";
    parrAlter.id = "parrafo";
    parrAlter.textContent = "Nombre: ";
    divBio.appendChild(parrAlter);
    let spanAlt = document.createElement("span");
    spanAlt.className = "alterEgo";
    spanAlt.id = "alterEgo";
    spanAlt.innerHTML = alterEgo;
    parrAlter.appendChild(spanAlt);
    //lugar de nacimiento
    let nac = bio["place-of-birth"];
    let parrNac = document.createElement("p");
    parrNac.className = "card-text";
    parrNac.id = "parrafo";
    parrNac.textContent = "Lugar de Nacimiento: ";
    divBio.appendChild(parrNac);
    let spanNac = document.createElement("span");
    spanNac.className = "lugarNac";
    spanNac.id = "lugarNac";
    spanNac.innerHTML = nac;
    parrNac.appendChild(spanNac);
    //Editorial
    let editorial = bio.publisher;
    let parrEdit = document.createElement("p");
    parrEdit.className = "card-text";
    parrEdit.id = "parrafo";
    parrEdit.textContent = "Publicado por: ";
    divBio.appendChild(parrEdit);
    let spanEdit = document.createElement("span");
    spanEdit.className = "ed";
    spanEdit.id = "editorial";
    spanEdit.innerHTML = editorial;
    parrEdit.appendChild(spanEdit);
    //boton de giro de tarjeta
    let divFav = document.createElement("div");
    divFav.id = "favDiv";
    divCard.appendChild(divFav);
    let fav = document.createElement("button");
    fav.id = "buttonFav";
    divFav.appendChild(fav);
    let star = document.createElement("i");
    star.className = "fas fa-arrows-alt-h";
    fav.appendChild(star);
  }

  /*let padreFav = document.getElementById("filaFav");
  let buttonFav = document.getElementById("buttonFav");
  buttonFav.addEventListener("click", () => {
    console.log("cargando a favoritos")
    for (let item in datos) {
      //creando los elementos recorriendo los resultados
      //creando cards
      let mainFav = document.createElement("div");
      mainFav.className =
        "col-12 col-md-6 col-xl-4 d-flex flex-column align-items-center";
      let divCardFav = document.createElement("div");
      divCardFav.id = "card6";
      divCardFav.className = "card";
      let divEncFav = document.createElement("div");
      divEncFav.id = "cardEnc";
      divEncFav.className = "d-flex flex-column align-items-center";
      let tituloEncFav = document.createElement("h2");
      tituloEncFav.className = "cardt-tittle";
      padreFav.appendChild(mainFav); // con esto le doy de quien es hijo cada uno, este va a uno el div card con el div flex
      mainFav.appendChild(divCardFav);
      divCardFav.appendChild(divEncFav);
      divEncFav.appendChild(tituloEncFav);
      //Agregando imagen
      let imagenFav = datos[item].image.url;
      let imgSupFav = document.createElement("img");
      imgSupFav.id = "imagen";
      imgSupFav.tagName = "imageSuper";
      imgSupFav.className = "card-img-top";
      imgSupFav.setAttribute("src", imagenFav);
      divEncFav.appendChild(imgSupFav);
    }
  });/*
  /*let habilidades = json.results[posicion].powerstats;

  let combat = (document.getElementById("combate").innerHTML =
    habilidades.combat);
  let durabilidad = (document.getElementById("durabilidad").innerHTML =
    habilidades.durability);
  let inteligencia = (document.getElementById("inteligencia").innerHTML =
    habilidades.intelligence);
  let poder = (document.getElementById("poder").innerHTML = habilidades.power);
  let velocidad = (document.getElementById("velocidad").innerHTML =
    habilidades.speed);
  let fuerza = (document.getElementById("fuerza").innerHTML =
    habilidades.strength);*/
}
