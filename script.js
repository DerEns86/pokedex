let currentPokemon = [];

let pokemonList = [];

// let url = 'https://pokeapi.co/api/v2/pokemon/1/?limit=20&offset=0'; (url um eine liste der Pokemons zu laden)

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



        pokemonCard.innerHTML += `<div>${currentPokemon[i]['name']}</div>`

            // console.log(pokemon);
    }
}