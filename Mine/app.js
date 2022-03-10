const pokedex = document.querySelector(".container"); // selector

// const array = []; (1.)

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0") //Getting data from url
    .then((res) => res.json()) // connecting to server, browser connecting to server
    .then((data) => {
      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        pokeCards(res);
      });
    });
};

const pokeCards = (data) => {
  console.log(data);
  console.log("pokemon data coming in", data);

  const cards = data
    .map((card) => {
      return `<div class="card"  > <img src="${card.sprites.other.dream_world.front_default}" alt="${card.name}" />  <h2 class="name">${card.name}</h2> </div>`;
    })
    .join("");

  pokedex.innerHTML = cards;
};

fetchData();
