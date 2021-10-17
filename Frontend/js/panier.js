//console.log("Je suis un panier");

//Afficher les détails par produits sélectionner
//Lien de l'API
//http://localhost:3000/api/teddies;

//Le localStorage 
let userProduct = JSON.parse(localStorage.getItem('product'));
console.log(userProduct);

//Tableau pour stocker les éléménts disponible dans le localStorage pour les  ajouter au panier

let cardItem = [];

//Stocker les valeur du panier 
const card = document.getElementById('card');
console.log(card);

//Mettre le code HTML du formulaire dans une variable
const addFormItem = `
   <div class="form__container">
          <div class="form__container__title">
            <h2>Finaliser votre commande</h2>
          </div>
          <div class="container">
            <form action="">
              <h2 class="container__title">Renseigner vos informations</h2>
              <div class="container__user__details">
                <div class="container__input">
                  <label for="firstName" class="details">Nom </label>
                  <input type="text" id="firstname" />
                </div>
                <div class="container__input">
                  <label for="lastName" class="details">Prenom</label>
                  <br />
                  <input type="text" id="lastName" />
                  <br />
                </div>
                <div class="container__input">
                  <label for="adress" class="details">Adresse</label>
                  <input type="text" id="adress" />
                </div>
                <div class="container__input">
                  <label for="city" class="details">Ville</label>
                  <input type="text" id="city" />
                </div>
                <div class="container__input">
                  <label for="email" class="details">E-mail</label>
                  <input type="text" id="email" />
                </div>
                <div class="container__input">
                  <label for="number" class="details"
                    >Numéro de téléphone</label
                  >
                  <input type="text" id="number" />
                </div>
              </div>
              <div class="container__valide">
                <input
                  type="submit"
                  class="card__button__valide"
                  value="Valider ma commande"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="card__button">
        <a class="card__button__shop" href="produit.html"
          >Continuez le shopping</a
        >
      </div>
 
      `
//Mettre le code HTML du prix total dans une variable
const totalPrice = `<div class="total-price">
          <table class="total-table">
            <tr>
              <td>Montant total</td>
              <td>5310 FCFA</td>
            </tr>
          </table>
        </div> `

//Vérifier si le panier est vide 

const addProductToCart = () => {
  if (userProduct === null || userProduct == 0) {
    const emptyCard = `
      <div class="card__item">
       <div class="empty"> 
         <h2>Le panier est vide 😢</h2>
        </div>
      </div>

    `
    card.innerHTML = emptyCard;
  } else {
    let userCard = [];
    let userCardItem = [];
    for (userCardItem = 0; userCardItem < userProduct.length; userCardItem++) {
      //console.log(userProduct);
      //Ajout de la logique à afficher dans la variable card
      userCard +=
        ` <div class="card__item">
        <table class="card__item__table">
          <thead class="card__item__thead">
            <tr>
              <th>Produits</th>
              <th>Quantités</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="card__td">
                <div class="card__item__product">
                  <img
                    src=" ${userProduct[userCardItem].productImg}"
                    alt="photo de ${userProduct[userCardItem].productName}"
                  />
                  <div class="card__item__infos">
                    <p>${userProduct[userCardItem].productName}</p>
                    <small>${userProduct[userCardItem].productOption}</small> <br />
                    <a href="#" id="btn_delete">Supprimer</a>
                  </div>
                </div>
              </td>

              <td>
                <input type="number" value="1" />
              </td>
              <td class="price_infos">${userProduct[userCardItem].price}€ </td>
            </tr>
          </tbody>
        </table>
  `;
    }







    if (userCardItem == userProduct.length) {
      //Afficher les éléments ajouter au panier sur le navigateur
      card.innerHTML = userCard + totalPrice + addFormItem;

    }
  }


}
addProductToCart();

//Supprimer les éléments du panier
const deleteCardItem = () => {
  const deleteBtn = document.querySelectorAll('#btn_delete');

  console.log(deleteBtn);
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', (e) => {
      e.preventDefault();

      //Selectionne produit à supprimer à l'aide de son ID
      const productIdValue = userProduct[i].idProduct;


      //Supprimer le produit selectionner 
      userProduct = userProduct.filter(el => el.idProduct !== productIdValue);


      //Envoyer les modifications dans le localStorage
      localStorage.setItem('product', JSON.stringify(userProduct));

      //Afficher à l'écran de l'utilisateur les modifications de son panier
      alert('Votre produit a été supprimer avec succès');
      location.href = 'panier.html';
    });

  }
}

deleteCardItem();





//console.log("Je contient des articles");




