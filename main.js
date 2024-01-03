
//constantes 
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
//URL de la API
let URL = "https://pokeapi.co/api/v2/pokemon/";


for (let i = 1; i <= 151; i++) {
    //Realiza una solicitud fetch para obtener datos de Pokemon
    fetch(URL + i)

        .then((response) => response.json())//Parsea la respuesta como JSON
        .then(data => mostrarPokemon(data)) // Llama a la función mostrarPokemon con los datos obtenidos
}

//Función mostrarPomemon
function mostrarPokemon(poke) {

    //Clea una etiqueta p por cada tipo
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    //Se verifica la longitud de la cadena para asegurarse de que siempre tenga tres dígitos en el id
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    //Crea un div
    const div = document.createElement("div");

    //Añade un div a cada clase CSS llamada pokemon
    div.classList.add("pokemon");

    //Contenido del div
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    //Agrega el div en listaPokemon ubicado en HTML
    listaPokemon.append(div);
}

//Evento en los botones header con el método forEach para recorrer cada botón
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    //se obtiene el id del botón indicado y se almacena en la const botonId
    const botonId = event.currentTarget.id;
    
    //Se limpia la listaPokemon añadiendo ""
    listaPokemon.innerHTML = "";

    //Este bucle for se utiliza para hacer solicitudes con fetch a la URL 
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            //Se procesa la respuesta JSON
            .then((response) => response.json())
            .then(data => {
                //Si se pulsa el botón de ver todos aparecerá todos los pokemon
                if(botonId === "ver-todos") {
                    //Se muestra los pokemon con la data correspondiente
                    mostrarPokemon(data);
                } else {
                //Sino se pulsa otro botón que no sea 'ver todos' aparecerá la información correspondiente al tipo de botón que se pulse
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))



