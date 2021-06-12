const pForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const names = document.querySelector('.names');
const icon = document.querySelector('.icon');
const image = document.querySelector('img.image');

const updateUI = (data) => {
    const stats = data.stats;

    names.innerHTML = `
    <h2 class="my-3 text-center">${stats.name}</h2>
    `;

    details.innerHTML = `
    <div class="hp mx-5">
    <span>HP</span>
    <div class="progress">
        <div class="progress-bar bg-danger text-dark" role="progressbar" style="width: ${stats.stats[0].base_stat}%;" aria-valuenow="${stats.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    </div>
    <div class="atk mx-5">
    <span>ATK</span>
    <div class="progress">
        <div class="progress-bar bg-primary text-dark" role="progressbar" style="width: ${stats.stats[1].base_stat}%;" aria-valuenow="${stats.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    </div>            
    <div class="def mx-5">
    <span>DEF</span>
    <div class="progress">
        <div class="progress-bar bg-success text-dark" role="progressbar" style="width: ${stats.stats[2].base_stat}%;" aria-valuenow="${stats.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    </div>

    `;
    

    let imageSrc = `https://raw.githubusercontent.com/imkpandey/PokeDex/assets/images/${stats.id}.png`;
    image.setAttribute("src", imageSrc);



    icon.innerHTML = `<h5 class="type mx-5">TYPE</h5>`;
    const types = stats.types.map(type => type.type.name);
    types.forEach(type => {
        const iconSrc = `https://raw.githubusercontent.com/imkpandey/PokeDex/assets/types/${type}.png`;
        icon.innerHTML += `
        <img src="${iconSrc}" height=30px>
        `; 
    });


    if (card.classList.contains("d-none")){
        card.classList.remove("d-none");
    }
    window.scrollTo(0,card.scrollHeight);

}

const updatePokemon = async (pokemon) => {
    const stats = await getPokemon(pokemon);

    return {
        stats: stats
    }
};

pForm.addEventListener("submit",e => {
    e.preventDefault();
    const pokemon = pForm.pokemon.value.trim();
    pForm.reset();

    updatePokemon(pokemon)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});