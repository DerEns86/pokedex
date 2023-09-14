let currentPokemon = [];

let pokemonList = [];

// let url = 'https://pokeapi.co/api/v2/pokemon/1/?limit=20&offset=0'; (url um eine liste der Pokemons zu laden)

async function init() {
    await loadPokemons();
    await renderPokemon();
}

async function loadPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
    let response = await fetch(url);
    pokemonsAsJson = await response.json();
    pokemonList = pokemonsAsJson['results'];
    console.log(pokemonList);
}

async function getPokemon(i) {

    let url = 'https://pokeapi.co/api/v2/pokemon/' + (i + 1);
    let response = await fetch(url);
    pokemonsAsJson = await response.json();
    currentPokemon.push(pokemonsAsJson);
}

async function renderPokemon() {
    let pokemonCard = document.getElementById('pokemonCard');

    pokemonCard.innerHTML = '';

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        await getPokemon(i);
        // pokemonCard.innerHTML += `
        // <div class="card" style="width: 18rem;">
        //     <div class="navBtns d-flex justify-content-between">
        //         <button>back</button>
        //         <button>Like</button>
        //     </div>
        //     <img src="${getCurrentPokemonImg(i)}" class="card-img-top" alt="...">
        //     <div class="card-body">
        //       <h5 class="card-title">Card title</h5>
        //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //       <a href="#" class="btn btn-primary">Go somewhere</a>
        //     </div>
        //   </div>`
        console.log(currentPokemon[i]['sprites']['front_default']);

        pokemonCard.innerHTML += `<div id="pokemon${i + 1}">${currentPokemon[i]['name']}</div>
        <img src="${getCurrentPokemonImg(i)}" class="card-img-top" alt="...">`


    }
    function getCurrentPokemonImg(i) {
        return currentPokemon[i]['sprites']['front_default'];
    }

}
