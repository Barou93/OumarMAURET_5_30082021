//console.log("Je suis un panier");

//Afficher les détails par produits sélectionner
//Lien de l'API
//http://localhost:3000/api/teddies;

//Le localStorage 
let userProduct = JSON.parse(localStorage.getItem('product'));
console.log(userProduct);

let cartCount = localStorage.getItem('cartCount');
//console.log(cartCount);

const articleItem = document.querySelector('.count');
//console.log(articleItem);

function onLoadPage() {
  let productNumbers = localStorage.getItem('cartCount');
  if (productNumbers) {
    articleItem.style.display = 'inline-block';
    articleItem.textContent = productNumbers;
  }
}

//Récupérer  l'icone panier avec le nombre de produit ajouter dans le panier
function inCart() {
  let productNumbers = localStorage.getItem('cartCount');

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartCount', productNumbers);
    articleItem.style.display = 'inline-block';
    articleItem.textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartCount', 1);
    articleItem.textContent = 1
  }
}
onLoadPage();



//Tableau pour stocker les éléménts disponible dans le localStorage pour les  ajouter au panier


let cardItem = [];

//Stocker les valeur du panier 
const card = document.querySelector('.cart-item');
//console.log(card);
//console.log(card);

const TotalPriceContainer = ` <div class="total-price" id="total__price">
          <div class="card__button">
          <a class="card__button__shop clear" id="clear" href="#"
          >Vider le panier</a>
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
    let i = 0;
    //Stocker les informations du produit selectionner

    for (i = 0; i < userProduct.length; i++) {

      //Ajout de la logique à afficher dans la variable card
      userCard +=
        ` 
      <tr class="cart-row">
        <td class="card__td">
          <div class="card__item__product">
            <img
              src=" ${userProduct[i].productImg}"
              alt="photo de ${userProduct[i].productName}"
            />
            <div class="card__item__infos">
              <p>${userProduct[i].productName}</p>
              <small>couleur: ${userProduct[i].productOption}</small> <br />
              <a href="#" id="btn_delete">Supprimer</a>
            </div>
          </div>
        </td>
           <td class="td-container">
           <div class="input_container">
               <div class="minus-btn" id="minus"></div>
                  <span type="number" class="number" id="quantite_produit">${userProduct[i].quantity}</span>
                    <div class="plus-btn" id="plus"></div>
                  </div>
            <td class="price_infos">${userProduct[i].price} € </td>
            </div>
           </td>
           </tr>
   
`;
    }
    if (i == userProduct.length) {
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
      localStorage.setItem('cartCount')
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
    localStorage.removeItem('cartCount');
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

    const tablePrice = document.getElementById('total__price');
    //console.log(tablePrice);



    const totalPrice = `
    <table class="total-table">
       <tr>
        <td>Montant total</td>
        <td class="cart-total-price">${itemPriceCalc} €</td>
    </tr>
    </table>
    `;
    // Afficher le prix sur le navigateur
    tablePrice.insertAdjacentHTML('beforeend', totalPrice);
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
        <span class="span"></span>
      </div>

      <div class="lastname-container ">
        <label for="lastname">lastName</label>
        <input type="text" id="lastname"   autocomplete="off" />
        <span class="span"></span>
      </div>
       
      <div class="adresse-container">
        <label for="address">adress</label>
        <input type="text" id="address"  autocomplete="off" />
        <span class="span"></span>
      </div>

       <div class="city-container ">
        <label for="city">city</label>
        <input type="text" id="city" autocomplete="off" />
        <span class="span"></span>
      </div>

      <div class="email-container">
        <label for="email">email</label>
        <input type="text" id="email" autocomplete="off" />
        <span class="span">Email incorrect</span>
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

const inputs = document.querySelectorAll('input[type="text"]');

let firstName, lastName, address, city, email;
const form = document.querySelector('form');
//console.log(form);


//formErrorDisplay();


const getFormValues = () => {


  //Afficher le message d'erreur si la valeur de l'utlisateur n'est pas valide
  function formErrorDisplay() {
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
    };

    //Récupérer les données saisis dans le champ adresse
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

    };
    //Récupérer les données saisis dans le champ email
    const emailChecker = (value) => {

      if (!value.match(/^[\w_-]+@+[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay('email', "Le mail n'est pas valide");
        email = null;

      } else {
        errorDisplay('email', '', true);
        email = value;

      }
    };
    //Récupérer les données saisis dans le champ city
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
    };
    //Récupérer les données saisis dans le champ firstName
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
        firstName = null;

      } else {
        errorDisplay('pseudo', '', true);
        firstName = value;

        //lastName = value;
      }
    };
    //Récupérer les données saisis dans le champ LastName
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
    };
    //console.log(userFirstName(e.target.value));
    //Récupérer les valeurs des inputs et les stocker dans une boucle
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
      });
    });

  }

  formErrorDisplay();



  //Ajouter un évènements sur le button 
  form.addEventListener('submit', (e) => {

    e.preventDefault();
    //Récupérer les données des champs du formulaire
    class Form {
      constructor() {
        this.firstName = document.querySelector('#firstname').value;
        this.lastName = document.querySelector('#lastname').value;
        this.address = document.querySelector('#address').value;
        this.city = document.querySelector('#city').value;
        this.email = document.querySelector('#email').value;
      }
    }

    let contact = new Form();
    //console.log(contact)

    localStorage.setItem('contact', JSON.stringify(contact));
    //console.log(contact);

    if (contact) {
      //console.log(contact)
      localStorage.setItem('contact', JSON.stringify(contact));
      inputs.forEach((input) => input.value = "")

    } else {
      alert('Veuillez remplir le formulaire Svp!');
    }

    //Stocker les id de tous les produits dans le tableau
    let products = [];
    //console.log(products);

    for (let i = 0; i < userProduct.length; i++) {
      let productId = userProduct[i].idProduct;
      //console.log(productId);
      products.push(productId);
    }
    console.log("products");
    console.log(products);

    //Envoyer dans le localStorage les informations du formulaires
    //localStorage.setItem('formValues', JSON.stringify(formValues));

    //Envoyer les informations (Produits + infos du formulaire) de l'utilisateur dans le localStorage
    let sendOrder = JSON.stringify({
      contact,
      products
    });
    console.log(sendOrder);

    //Envoyer les données sur le serveur
    const send = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: sendOrder
    }
    fetch('http://localhost:3000/api/teddies/order', send);
    console.log(send);
  })
}
getFormValues();