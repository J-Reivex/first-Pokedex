const poke_container = document.getElementById('poke-container');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const backBtn = document.getElementById('back-btn');
const pokemon_number = 151;


const fetchPokemons = async () => {
    poke_container.innerHTML = '';
    for (let i = 1; i <= pokemon_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id.toString();
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

const createPokemonCard = (pokemon) => {
    const { name, types, sprites, id, height, weight } = pokemon;
    const type = types[0].type.name;

    let tipos = pokemon.types.map(
        (type) => `<p class='${type.type.name} tipo'>${type.type.name}</p> `
    );
    tipos = tipos.join('');

    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    pokemonEl.classList.add('grow');

    const pokeInnerHtml = `
    <div class='img-container'>
    <img src='${sprites.other["official-artwork"].front_default}' alt='${name}'/>
    </div>
    <div class='info'>
        <span class='number'>${pokeId}</span>
        <h3 class='name'>${name}</h3>
        <div class='type'>${tipos}</div>
        <div class='status'>
            <p class='stat-info'>${height / 10}m</p>
            <p class='stat-info'>${weight / 10}kg</p>
        </div>
    </div>
    `;
    pokemonEl.innerHTML = pokeInnerHtml;
    poke_container.appendChild(pokemonEl);
}

const searchPokemon = async () => {
    const searchValue = searchInput.value.toLowerCase();
    poke_container.innerHTML = '';
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${searchValue}`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Pokemon not found");
        const pokemon = await res.json();
        createPokemonCard(pokemon);
    } catch (error) {
        poke_container.innerHTML = `<h3>No se ha encontrado el pokemon que esta buscando</h3>`;
    }
}

const goBack = () => {
    searchInput.value = '';
    fetchPokemons();
}

searchBtn.addEventListener('click', searchPokemon);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchPokemon();
})

backBtn.addEventListener('click', goBack);


fetchPokemons();
