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

// function getPokemonName(i) {
//     return currentPokemon[i].name;
// }

// function getPokemonId(i) {
//     return currentPokemon[i].id;
// }



function getPokemonTypes(i) {
    let types = currentPokemon[i].types;
    let typesHtml = '';
    for (let j = 0; j < types.length; j++) {
        const type = types[j].type.name;
        typesHtml += `<div class="type">${type}</div>`;
    }
    return typesHtml;
}

function getPokemonAbilities(i) {
    let abilities = currentPokemon[i].abilities;
    let abilitiesHtml = '';
    for (let j = 0; j < abilities.length; j++) {
        const ability = abilities[j].ability.name;
        abilitiesHtml += `<div class="ability">${ability}</div>`;
    }
    return abilitiesHtml;
}

function getPokemonBaseStats(i) {
    let baseStats = currentPokemon[i].stats;
    let baseStatsHtml = '';
    for (let j = 0; j < baseStats.length; j++) {
        const baseStatName = baseStats[j].stat.name;
        const baseStatValue = baseStats[j].base_stat;
        baseStatsHtml += `<div class="baseStatName">${baseStatName}</div>
                          <div class="baseStatValue">${baseStatValue}</div>
        `;
    }
    return baseStatsHtml;
}


function getPokemonMoves(i) {
    let moves = currentPokemon[i].moves;
    let movesHtml = '';
    for (let j = 0; j < moves.length; j++) {
        const move = moves[j].move.name;
        movesHtml += `<div class="moveName">${move}</div>
                         
        `;
    }
    return movesHtml;
}



function generatePokemonList(i) {
    return /*html*/`
        <div onclick="openPokemonCardOverlay(${i})" class="card" style="background-color: ${getBackgroundColor(i)};" id="ListCard${getValuefromCurrentPokem('id', i)}">
             <div class="listHeader d-flex justify-content-between">
             <h5 class="card-title">${getValuefromCurrentPokem('name', i)}</h5>
             <h5 id="pokemonId">${getValuefromCurrentPokem('id', i)}</h5>
             </div>
             
             <div class="card-body d-flex">
               
               <p class="card-text " id="pokemonTypes">${getPokemonTypes(i)}</p>
             </div>
             <img src="./pokemon.png" class="imgTransparent">
             <img src="${getCurrentPokemonImg(i)}" class="card-img-top" alt="...">
        </div>
    `
}

function openPokemonCardOverlay(i) {
    document.getElementById('pokemonCardOverlay').classList.remove('d-none');
    generatePokemonCardOverlay(i);

    document.getElementById('currentPokemonName').innerHTML = getValuefromCurrentPokem('name', i);
    document.getElementById('pokemonId').innerHTML = getValuefromCurrentPokem('id', i);
    document.getElementById('CurrentPokemonTypes').innerHTML = getPokemonTypes(i);
    document.getElementById('currentPokemonImage').src = `${getCurrentPokemonImg(i)}`;
    console.log('open' + i);
    // generatePokemonCardOverlay(i);
    renderStatsAbout(i);
    renderStatsBase(i);
    renderStatsMoves(i);
}

function generatePokemonCardOverlay(i) {
    return /*html*/`
         <div class="cardOverlay "  style="width: 32rem;" >
            <div class="listHeader d-flex justify-content-between">
            <h5 class="card-title" id="currentPokemonName"></h5>
            <h5 id="pokemonId"></h5>
            </div>
            
            <div class="card-body d-flex">
              
              <p class="card-text " id="CurrentPokemonTypes"></p>
            </div>
            <img  class="card-img-top" id="currentPokemonImage">

            <div class="cardStats">
                
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <div class="nav-link active" aria-current="page" onclick="openAbout()" id="aboutLink">About</div>
                    </li>
                    <li class="nav-item">
                      <div class="nav-link " onclick="openBaseStat()" id="baseStatsLink">Base Stats</div>
                    </li>
                    <li class="nav-item">
                      <div class="nav-link" onclick="openMoves()" id="movesLink" >Moves</div>
                    </li>
                    
                  </ul>

                  <div class="statsContent" id="statsContentAbout"></div>
                  <div class="statsContent d-none" id="statsContentBase"></div>
                  <div class="statsContent d-none" id="statsContentMoves"></div>

            </div>
    `
}

function renderStatsAbout(i) {
    let content = document.getElementById('statsContentAbout');

    content.innerHTML = /*html*/`
        <div id="species"><span>Species:</span><span>${getCurrentPokemonSpecies(i)}</span></div>
        <div id="height"><span>Height:</span><span>${getValuefromCurrentPokem('height', i)}</span></div>
        <div id="weight"><span>Weight:</span><span>${getValuefromCurrentPokem('weight', i)}</span></div>
        <div id="abilities">${getPokemonAbilities(i)}</div>

    `
}

function renderStatsBase(i) {
    let content = document.getElementById('statsContentBase');

    content.innerHTML = getPokemonBaseStats(i);
}


function renderStatsMoves(i) {
    let content = document.getElementById('statsContentMoves');

    content.innerHTML = getPokemonMoves(i);
}



function openBaseStat() {
   
    document.getElementById('statsContentBase').classList.remove('d-none');
    
   
    document.getElementById('statsContentAbout').classList.add('d-none');
    document.getElementById('statsContentMoves').classList.add('d-none');
    
   
    document.getElementById('aboutLink').classList.remove('active');
    
   
    document.getElementById('baseStatsLink').classList.add('active');
}

function openMoves() {
    document.getElementById('statsContentMoves').classList.remove('d-none');
    
    document.getElementById('statsContentAbout').classList.add('d-none');
    document.getElementById('statsContentBase').classList.add('d-none');
    
    document.getElementById('aboutLink').classList.remove('active');
    
    document.getElementById('movesLink').classList.add('active');
}

function openAbout() {
    document.getElementById('statsContentAbout').classList.remove('d-none');
    
    document.getElementById('statsContentBase').classList.add('d-none');
    document.getElementById('statsContentMoves').classList.add('d-none');
    
    document.getElementById('baseStatsLink').classList.remove('active');
    document.getElementById('movesLink').classList.remove('active');
    
    document.getElementById('aboutLink').classList.add('active');
}
