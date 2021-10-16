window.onload = iniciar;

function iniciar() {
  let button = document.getElementById("cargarHeroes");
  button.addEventListener("click", clickJson);
  /*let search = document.getElementById("buscador");
  search.addEventListener("keyup", clickJson);*/
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
  modal(json, e);
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
  //recorriendo los resultados
  for (let item in datos) {
    //creando cards
    let main = document.createElement("div");
    main.id = "main";

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
    divCard.id = "cardSup";
    divCard.className = "card";
    //creando Card Front
    let divEnc = document.createElement("div");
    divEnc.id = "cardFront";
    divEnc.className = "d-flex flex-column align-items-center";
    let tituloEnc = document.createElement("h2");
    tituloEnc.className = "card-tittle";

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
    divEnc.appendChild(divBio);
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

    //boton muestra de habilidades
    let divFav = document.createElement("div");
    divFav.id = "favDiv";
    divEnc.appendChild(divFav);
    let fav = document.createElement("button");
    fav.id = "buttonFav";

    divFav.appendChild(fav);
    let star = document.createElement("i");
    star.className = "fas fa-arrows-alt-h";
    fav.appendChild(star);

    //girando card para mostrar habilidades
    fav.addEventListener("click", () => {
      divCard.classList.toggle("flipCard");
    });
    //creando habilidades
    let divHab = document.createElement("div");
    divHab.id = "cardBack";
    divHab.className = "d-flex flex-column justify-content-between";
    divCard.appendChild(divHab);

    //nombre en habilidades
    let tituloHab = document.createElement("h2");
    tituloHab.className = "card-tittle-hab card-tittle" ;
    tituloHab.innerHTML = name;
    divHab.appendChild(tituloHab);
    

    //Mostrando habilidades
    let habilidades = json.results[item].powerstats;

    //mostrando combate
    let combate = habilidades.combat;
    let parrComb = document.createElement("p");
    parrComb.className = "card-text";
    parrComb.id = "parrafoHab";
    parrComb.textContent = "Combate: ";
    divHab.appendChild(parrComb);
    let spanComb = document.createElement("span");
    spanComb.className = "comb";
    spanComb.id = "spanHab";
    spanComb.innerHTML = combate;
    parrComb.appendChild(spanComb);

    //mostrando durabilidad
    let durabilidad = habilidades.durability;
    let parrDur = document.createElement("p");
    parrDur.className = "card-text";
    parrDur.id = "parrafoHab";
    parrDur.textContent = "Durabilidad: ";
    divHab.appendChild(parrDur);
    let spanDur = document.createElement("span");
    spanDur.className = "dur";
    spanDur.id = "spanHab";
    spanDur.innerHTML = durabilidad;
    parrDur.appendChild(spanDur);
    //mostrando Inteligencia
    let inteligencia = habilidades.intelligence;
    let parrInt = document.createElement("p");
    parrInt.className = "card-text";
    parrInt.id = "parrafoHab";
    parrInt.textContent = "Inteligencia: ";
    divHab.appendChild(parrInt);
    let spanInt = document.createElement("span");
    spanInt.className = "int";
    spanInt.id = "spanHab";
    spanInt.innerHTML = inteligencia;
    parrInt.appendChild(spanInt);
    //mostrando poder
    let poder = habilidades.power;
    let parrPod = document.createElement("p");
    parrPod.className = "card-text";
    parrPod.id = "parrafoHab";
    parrPod.textContent = "Poder: ";
    divHab.appendChild(parrPod);
    let spanPod = document.createElement("span");
    spanPod.className = "pod";
    spanPod.id = "spanHab";
    spanPod.innerHTML = poder;
    parrPod.appendChild(spanPod);
    //mostrando velocidad
    let velocidad = habilidades.speed;
    let parrVel = document.createElement("p");
    parrVel.className = "card-text";
    parrVel.id = "parrafoHab";
    parrVel.textContent = "Velocidad: ";
    divHab.appendChild(parrVel);
    let spanVel = document.createElement("span");
    spanVel.className = "vel";
    spanVel.id = "spanHab";
    spanVel.innerHTML = velocidad;
    parrVel.appendChild(spanVel);
    //mostrando Fuerza
    let fuerza = habilidades.strength;
    let parrFuer = document.createElement("p");
    parrFuer.className = "card-text";
    parrFuer.id = "parrafoHab";
    parrFuer.textContent = "Fuerza: ";
    divHab.appendChild(parrFuer);
    let spanFuer = document.createElement("span");
    spanFuer.className = "fuer";
    spanFuer.id = "spanHab";
    spanFuer.innerHTML = fuerza;
    parrFuer.appendChild(spanFuer);


    //boton de girar card Back
    let girar = document.createElement("button");
    girar.id = "buttonGirar";
    divHab.appendChild(girar);
    let volver = document.createElement("i");
    volver.className = "fas fa-arrows-alt-h";
    girar.appendChild(volver);
    girar.addEventListener("click", () => {
      divCard.classList.toggle("flipCard");
    });
  }
}
