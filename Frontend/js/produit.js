//Afficher les détails par produits sélectionner
//Lien de l'API
//http://localhost:3000/api/teddies;

//Tableau vide dans lequel les produts selectionner seront stocker
let productDetail = [];


//Récuperation de la chaîne de requete dans l'URL
const queryStringUrlID = location.search;

//Récupérer le nom de l'id de l'URL
const urlSearchParams = new URLSearchParams(queryStringUrlID);

//Affichage de l'ID du produit selectionner
const productID = urlSearchParams.get('id');
//console.log(productID);

//Affichage du produit contenu dans l'Objet qui a été sélectionner par l'ID

//Récupérer les produits de l'API

const URL = 'http://localhost:3000/api/teddies' + '/' + productID;
//console.log(URL);



const getProductsData = async () => {
    await fetch(URL)
        .then((res) => res.json())
        .then((data) => productDetail = data)
    console.log(productDetail);

}


const displayProductsDetail = async () => {
    await getProductsData();

    let productItem = document.getElementById('productItem');
    // Récupérer le produit pqr son ID et l'afficher sur le navigateur
    productItem.innerHTML =

        `
        <div class="products__item__container">
        <div class="products__item__img__container">
          <div class="products__item__image">
            <img
              src=" ${productDetail.imageUrl}"
              alt="photo de ${productDetail.name} "
            />
          </div>
        </div>
        <div class="products__item__description__container">
          <div class="products__item__descriptions">
            <h2> ${productDetail.name}</h2>
            <span class="price">${productDetail.price / 100} € </span>
            <p>Détails du produit</p>
            <p class="description">${productDetail.description} </p>
          </div>
           <div class="products__item__details">
            <h2>Choisissez votre modèle</h2>
          </div>
          <div class="products__item__select">
                <select id="select" name="select">
              <option value="" class="option">Selectionner votre modèle</option>
              <option value="${productDetail.colors}" class="option ">${productDetail.colors}</option>
            </select>
          </div>
          <div class="products__item__card">
              <a href="${productDetail._id} " class="products__item__card__button">Ajouter au panier</a>
            </select>
          </div>
        </div>
      </div>
      `
    const selectID = document.getElementById('select');
    console.log(selectID);
};
displayProductsDetail()



//Récupérer les données de la balise Select
