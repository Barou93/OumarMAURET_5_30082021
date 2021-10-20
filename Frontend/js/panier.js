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
//console.log(card);

const TotalPriceContainer = ` <div class="total-price" id="total__price">
          <div class="card__button">
          <a class="card__button__shop clear" id="clear" href="#"
          >Vider le panier</a>
        </div>
         <table class="total-table">
            <tr>
              <td>Montant total</td>
              <td></td>
            </tr>
          </table>
      </div>`;
//Mettre le code HTML du formulaire dans une variable


const addProductToCart = () => {
  //Vérifier si le panier est vide ou si le panier ne contient aucun produit
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
    //Ajouter le produit selectionner dans le panier dans le tableau
    let userCard = [];
    //Stocker les informations du produit selectionner
    let userCardItem = [];
    for (userCardItem = 0; userCardItem < userProduct.length; userCardItem++) {

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
      card.innerHTML = userCard + TotalPriceContainer;
    }
  }

}
addProductToCart();

//Supprimer un élément du panier
const deleteCardItem = () => {

  //Button pour supprimer chaque article
  const deleteBtn = document.querySelectorAll('#btn_delete');

  //console.log(deleteBtn);
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


//Supprimer tous éléménts du panier
const deleteCardAllItem = () => {

  let deleteAllItem = document.querySelector('#clear');

  //Fonction pour vider le panier
  const deleteItem = () => {
    localStorage.removeItem('product');
    alert('Le panier a été vidé avec succès');
    //Actualiser la page après suppression des données
    location.href = "panier.html";
  }



  //Button pour vider le panier
  deleteAllItem.addEventListener("click", (e) => {
    e.preventDefault();
    if (userProduct) {
      deleteItem();
      // console.log('Je suis vide');
    } else {

      deleteAllItem.removeEventListener('click', e);

    }
  });

}

deleteCardAllItem();


//Additionner le prix des articles 

const allItemPrice = [];

//Faire le total des prix des différents produits 
const addProductTotalPrice = () => {

  //Récupéter les prix dans le localStorage

  for (let price in userProduct) {
    //Stocker les prix du localStorage
    let itemPrice = userProduct[price].price

    //Ajouter les prix dans un tableau
    allItemPrice.push(itemPrice);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let itemPriceCalc = allItemPrice.reduce(reducer);

    const tablePrice = document.querySelector('.total-table');

    // Afficher le prix sur le navigateur
    tablePrice.innerHTML = `<tr>
      <td>Montant total</td>
      <td>${itemPriceCalc} €</td>
    </tr>`;
  }
}

addProductTotalPrice();

//Afficher le formulaire sur le navigateur
const displayForm = () => {
  const formEl = document.querySelector('#card');
  //console.log(formEl);

  const form = `
   <div class="title__container">
            <h2>Finaliser votre commande</h2>
          </div>
          </div>
          <div class="form__container">
         <form>
      <div class="pseudo-container">
        <label for="firstname">firstName</label>
        <input type="text" id="firstname"  autocomplete="off" />
        <span></span>
      </div>

      <div class="lastname-container ">
        <label for="lastname">lastName</label>
        <input type="text" id="lastname"   autocomplete="off" />
        <span></span>
      </div>
       
      <div class="adresse-container">
        <label for="address">adress</label>
        <input type="text" id="address"  autocomplete="off" />
        <span></span>
      </div>

       <div class="city-container ">
        <label for="city">city</label>
        <input type="text" id="city" autocomplete="off" />
        <span></span>
      </div>

      <div class="email-container">
        <label for="email">email</label>
        <input type="text" id="email" autocomplete="off" />
        <span>Email incorrect</span>
      </div>

      <input type="submit" value="Valider" id="btn-valid" />
    </form>
        </div>
      
      <div class="card__button">
        <a class="card__button__shop" href="produit.html"
          >Continuez le shopping</a
        >
      </div>
 
      `
  formEl.insertAdjacentHTML('afterend', form);
}

displayForm();

//Récupérer les informations du formaulaire
const confirmBtn = document.querySelector('#btn-valid');

//let pseudo, email, adress, city;

const inputs = document.querySelectorAll('input[type="text"]');
console.log(inputs);

let firstName, lastName, address, city, email;
const form = document.querySelector('form');
console.log(form);


//formErrorDisplay();


const getFormValues = () => {

  //console.log(confirmBtn);
  //Afficher le message d'erreur si la valeur de l'utlisateur n'est pas valide
  const formErrorDisplay = () => {
    //displayForm();
    const errorDisplay = (tag, message, valid) => {
      const container = document.querySelector(`.${tag}-container`);
      const span = document.querySelector(`.${tag}-container > span`);


      if (!valid) {
        container.classList.add('error');
        span.textContent = message;
      } else {
        container.classList.remove('error');
        span.textContent = message;
      }
    }


    const adresseChecker = (value) => {

      if (value.length > 0 && (value.length < 3 ||
        value.length > 40)) {
        errorDisplay('adresse', "Votre adresse doit etre entre 3 et 10 caractères");
        address = null;
      } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {

        errorDisplay('adresse', "Votre adresse  ne doit pas contenir de caractères spéciaux");
        address = null;
      } else {
        errorDisplay('adresse', '', true);
        address = value;
      }

    }
    const emailChecker = (value) => {

      if (!value.match(/^[\w_-]+@+[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay('email', "Le mail n'est pas valide");
        email = null;

      } else {
        errorDisplay('email', '', true);
        email = value;

      }
    }
    const cityChecker = (value) => {
      if (value.length > 0 && (value.length < 3 ||
        value.length > 10)) {

        errorDisplay('city', "Votre ville doit etre entre 3 et 10 caractères");
        city = null;
      } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {

        errorDisplay('city', "Votre ville  ne doit pas contenir de caractères spéciaux");
        city = null;
      } else {
        errorDisplay('city', '', true);
        city = value;
      }
    }
    const userChecker = (value) => {
      //console.log(value);
      //Si le numéro de l'utilsateur ne respecte pas les conditions requises 
      if (value.length > 0 && (value.length < 3 ||
        value.length > 20)) {
        errorDisplay('pseudo', 'Le nom doit etre entre 3 et 20 caractères');
        firstName = null;
        //console.log(pseudo);
      }
      //SI le nom de l'utilisateur contient des caractères spéciaux
      else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('pseudo', 'Votre nom ne doit pas contenir de caractères spéciaux ');
        firstName = null

      } else {
        errorDisplay('pseudo', '', true);
        firstName = value;

        //lastName = value;
      }
    }
    const LastNameChecker = (value) => {
      if (value.length > 0 && (value.length < 3 ||
        value.length > 20)) {

        errorDisplay('lastname', "Votre prenom doit etre entre 3 et 20 caractères");
        lastName = null;

      } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {

        errorDisplay('lastname', "Votre prenom ne doit pas contenir de caractères spéciaux");
        lastName = null;
      } else {
        errorDisplay('lastname', '', true);
        lastName = value;
      }
    }
    //console.log(userFirstName(e.target.value));

    //console.log(inputs);
    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        //console.log(e.target.value);
        switch (e.target.id) {
          case "firstname":
            userChecker(e.target.value);
            break;
          case "lastname":
            LastNameChecker(e.target.value);
            break;

          case "address":
            adresseChecker(e.target.value);
            break;
          case "city":
            cityChecker(e.target.value);
            break;
          case "email":
            emailChecker(e.target.value);
          default:
            null;
        }
      })
    });

  }

  formErrorDisplay();



  //Ajouter un évènements sur le button 
  form.addEventListener('submit', (e) => {


    e.preventDefault();
    //Récupérer les données des champs du formulaire
    if (firstName && lastName && address && city && email) {

      class Form {
        constructor() {
          this.firstName = firstName;
          this.lastName = lastName;
          this.adresse = address;
          this.city = city;
          this.email = email;

        }
      }

      //Ajouter les valeurs de la classe
      const formValues = new Form();
      console.log(formValues);


      localStorage.setItem('formValues', JSON.stringify(formValues));

      inputs.forEach((input) => input.value = "")
      firstName = null;
      lastName = null;
      address = null;
      city = null;
      email = null;

    }
    else {
      alert("Veuillez compléter le formulaire s'il vous plait !");
    }

    //Class constructeur pour afficher les valeurs du formulaire



    //Gestion validation du formulaire

    //Vérifie si le nom de l'utilisateur respecte certaines conditions
    //let userName = formValues.firstName;

    //Envoyer dans le localStorage les informations du formulaires
    localStorage.setItem('formValues', JSON.stringify(formValues));

    //Envoyer les informations (Produits + infos du formulaire) de l'utilisateur dans le localStorage
    const sendFormValues = {
      userProduct,
      formValues
    }
    console.log(sendFormValues);
  });

}
getFormValues();