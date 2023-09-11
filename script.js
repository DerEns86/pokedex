let pokemons;

async function loadPokemons(){
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
    let response = await fetch(url);
    pokemons = await response.json();
}