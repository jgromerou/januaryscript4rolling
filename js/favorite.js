const getFavorites = () => {
  const myFavorites = JSON.parse(localStorage.getItem('myFavs'));
  const containerCardsFavorites = document.getElementById(
    'container-cards-favorites'
  );

  const cards = myFavorites.map(
    (info) => `
    <div class="card w-25 m-2">
        <div class="card-body">
            <h5 class="card-title">${info.title}</h5>
            <p class="card-text">${info.author}</p>
            <a href="#" class="btn btn-primary" onclick="deleteFav(${info.objectID})">&#x1F494</a>
        </div>
    </div>`
  );
  containerCardsFavorites.innerHTML = cards;
};

getFavorites();

const deleteFav = (objID) => {
  const existingFavs = JSON.parse(localStorage.getItem('myFavs')) || [];
  const itemToDelete = existingFavs.some(({ objectID }) => objectID == objID);

  if (itemToDelete) {
    const arrayWithoutItemDelete = existingFavs.filter(
      ({ objectID }) => objectID != objID
    );
    //setea a myFavs sin el objectID eliminado
    localStorage.setItem('myFavs', JSON.stringify(arrayWithoutItemDelete));
    alert(`Se eliminó de favoritos!`);
    window.location.reload();
  }
};
