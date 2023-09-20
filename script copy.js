let currentPokemon = [];
let currentPokemonSpecies = [];
let pokemonList = [];

// let url = 'https://pokeapi.co/api/v2/pokemon/1/?limit=20&offset=0'; (url um eine liste der Pokemons zu laden)

async function init() {
    await loadPokemons();
    await renderPokemon();
    console.log(currentPokemon);
}

async function loadPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
    let response = await fetch(url);
    pokemonsAsJson = await response.json();
    pokemonList = pokemonsAsJson['results'];

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
        await getCurrentPokemonSpeciesData(i);


        pokemonCard.innerHTML += generatePokemonList(i);

    }


}

async function getCurrentPokemonSpeciesData(i) {

    let url = 'https://pokeapi.co/api/v2/pokemon-species/' + (i + 1);
    let response = await fetch(url);
    pokemonsAsJson = await response.json();
    currentPokemonSpecies.push(pokemonsAsJson);

}

function getCurrentPokemonSpecies(i) {
    return currentPokemonSpecies[i].genera[7].genus;
}

function getCurrentPokemonImg(i) {
    return currentPokemon[i].sprites.other.dream_world['front_default'];

}

function getValuefromCurrentPokem(key, i) {
    return currentPokemon[i][key];
}

function getPokemonName(i) {
    return currentPokemon[i].name;
}

function getPokemonId(i) {
    return currentPokemon[i].id;
}



function getPokemonTypes(i) {
    let types = currentPokemon[i].types;
    let typesHtml = '';
    for (let j = 0; j < types.length; j++) {
        const type = types[j].type.name;
        typesHtml += `<div class="type">${type}</div>`;
    }
    return typesHtml;
}



function generatePokemonList(i) {
    return /*html*/`
        <div onclick="openPokemonCardOverlay(${i})" class="card" style="width: 18rem;" id="ListCard${getPokemonId(i)}">
             <div class="listHeader d-flex justify-content-between">
             <h5 class="card-title">${getPokemonName(i)}</h5>
             <h5 id="pokemonId">${getPokemonId(i)}</h5>
             </div>
             
             <div class="card-body d-flex">
               
               <p class="card-text " id="pokemonTypes">${getPokemonTypes(i)}</p>
             </div>
             <img src="${getCurrentPokemonImg(i)}" class="card-img-top" alt="...">
        </div>
    `
}

function openPokemonCardOverlay(i) {
    document.getElementById('currentPokemonName').innerHTML = getPokemonName(i);
    document.getElementById('pokemonId').innerHTML = getPokemonId(i);
    document.getElementById('CurrentPokemonTypes').innerHTML = getPokemonTypes(i);
    document.getElementById('currentPokemonImage').src = `${getCurrentPokemonImg(i)}`;
    console.log('open' + i);
    // generatePokemonCardOverlay(i);
}

function generatePokemonCardOverlay(i) {
    return /*html*/`
        <div class="card overlay d-none" style="width: 32rem;" id="ListCard${getPokemonId(i)}">
             <div class="listHeader d-flex justify-content-between">
             <h5 class="card-title">${getPokemonName(i)}</h5>
             <h5 id="pokemonId">${getPokemonId(i)}</h5>
             </div>
             
             <div class="card-body d-flex">
               
               <p class="card-text " id="pokemonTypes">${getPokemonTypes(i)}</p>
             </div>
             <img src="${getCurrentPokemonImg(i)}" class="card-img-top" alt="...">
        </div>
    `
}

function renderStatsAbout(i) {
    let content = document.getElementById('statsContentAbout');

    content.innerHTML = /*html*/`
        <div id="species"><span>Species:</span><span>${getCurrentPokemonSpecies(i)}</span></div>
        <div id="height"></div>
        <div id="species"></div>
        <div id="species"></div>

        <p>Breeding</p>
        <div id="gender"></div>
        <div id="egggroups"></div>
        <div id="eggCycle"></div>
    `
}