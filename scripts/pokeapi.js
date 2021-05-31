const getPokemon = async (name) => {
    const base = "https://pokeapi.co/api/v2/pokemon/";
    const query = `${name}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;

};

