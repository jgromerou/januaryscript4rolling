const getData = async () => {
  return await fetch(
    'https://hn.algolia.com/api/v1/search_by_date?query=javascript&page=0'
  )
    .then((response) => response.json())
    .then((data) => data.hits);
};

// getData();
//console.log(getData());

const createCards = async () => {
  const containerCards = document.getElementById('container-cards');
  const data = await getData();
  localStorage.setItem('dataAPI', JSON.stringify(data));
  const cards = data.map(
    (info) => `<div class="card w-25 m-2">
        <div class="card-body">
            <h5 class="card-title">${info.title}</h5>
            <p class="card-text">${info.author}</p>
            <a href="#" class="btn btn-primary" onclick="addFav(${info.objectID})">&#x1F493</a>
        </div>
    </div>`
  );
  containerCards.innerHTML = cards;
};

createCards();

const addFav = (objID) => {
  const data = JSON.parse(localStorage.getItem('dataAPI'));
  let existingFavs = JSON.parse(localStorage.getItem('myFavs')) || [];
  const itemEqual = existingFavs.some(({ objectID }) => objectID == objID);
  if (!itemEqual) {
    let fav = data.find((info) => info.objectID == objID);

    existingFavs.push(fav);

    localStorage.setItem('myFavs', JSON.stringify(existingFavs));
    alert(`Agregamos a favoritos:${fav.story_title}`);
  } else {
    alert(`Ya se encuentra en Favoritos`);
  }
};
