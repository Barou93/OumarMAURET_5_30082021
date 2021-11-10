"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Afficher les détails par produits sélectionner
//Le localStorage 
var userProduct = JSON.parse(localStorage.getItem('product'));
console.log(userProduct); //Récuperer  le nombre de produit dans l'icone panier dans le localStorage

var cartCount = localStorage.getItem('cartCount');
var articleItem = document.querySelector('.count');

function onLoadPage() {
  var productNumbers = localStorage.getItem('cartCount');

  if (productNumbers) {
    articleItem.style.display = 'inline-block';
    articleItem.textContent = productNumbers;
  }
}

onLoadPage(); //Tableau pour stocker les éléménts disponible dans le localStorage pour les  ajouter au panier

var cardItem = []; //Stocker les valeur du panier 

var card = document.querySelector('.cart-item');
var TotalPriceContainer = " <div class=\"total-price\" id=\"total__price\">\n          <div class=\"card__button\">\n          <a class=\"card__button__shop clear\" id=\"clear\" href=\"#\"\n          >Vider le panier</a>\n      </div>"; //Mettre le code HTML du formulaire dans une variable

var addProductToCart = function addProductToCart() {
  //Vérifier si le panier est vide ou si le panier ne contient aucun produit
  if (userProduct === null || userProduct == 0) {
    var emptyCard = "\n  <div class=\"card__item\">\n    <div class=\"empty\">\n      <h2>Le panier est vide \uD83D\uDE22</h2>\n    </div>\n      </div>\n  ";
    card.innerHTML = emptyCard;
  } else {
    //Ajouter le produit selectionner dans le panier dans le tableau
    var userCard = [];
    var i = 0; //Stocker les informations du produit selectionner

    for (i = 0; i < userProduct.length; i++) {
      //Ajout de la logique à afficher dans la variable card
      userCard += " \n      <tr class=\"cart-row\">\n        <td class=\"card__td\">\n          <div class=\"card__item__product\">\n            <img\n              src=\" ".concat(userProduct[i].productImg, "\"\n              alt=\"photo de ").concat(userProduct[i].productName, "\"\n            />\n            <div class=\"card__item__infos\">\n              <p>").concat(userProduct[i].productName, "</p>\n              <small>couleur: ").concat(userProduct[i].productOption, "</small> <br />\n              <a href=\"#\" id=\"btn_delete\">Supprimer</a>\n            </div>\n          </div>\n        </td>\n           <td class=\"td-container\">\n           <div class=\"input_container\">\n               <div class=\"minus-btn\" id=\"minus\"></div>\n                  <span type=\"number\" class=\"number\" id=\"quantite_produit\">").concat(userProduct[i].quantity, "</span>\n                    <div class=\"plus-btn\" id=\"plus\"></div>\n                  </div>\n            <td class=\"price_infos\">").concat(userProduct[i].price, " \u20AC </td>\n            </div>\n           </td>\n           </tr>\n   \n");
    }

    if (i == userProduct.length) {
      //Afficher les éléments ajouter au panier sur le navigateur
      card.innerHTML = userCard + TotalPriceContainer;
    }
  }
};

addProductToCart(); //Supprimer un élément du panier

var deleteCardItem = function deleteCardItem() {
  //Button pour supprimer chaque article
  var deleteBtn = document.querySelectorAll('#btn_delete'); //console.log(deleteBtn);

  var _loop = function _loop(i) {
    deleteBtn[i].addEventListener('click', function (e) {
      e.preventDefault(); //Selectionne produit à supprimer à l'aide de son ID

      var productIdValue = userProduct[i].idProduct; //Selectionne le produit contenu dans l'icone panier 
      //Supprimer le produit selectionner 

      userProduct = userProduct.filter(function (el) {
        return el.idProduct !== productIdValue;
      }); //Supprimer la quantité  afficher sur l'icone panier et dans le localStorage

      var articleItem = document.querySelector('.count');
      var article = localStorage.getItem('cartCount');
      article = parseInt(cartCount);

      if (article) {
        localStorage.setItem('cartCount', article - 1);
        articleItem.style.display = 'inline-block';
        articleItem.textContent = article - 1;
      } //Envoyer les modifications dans le localStorage


      localStorage.setItem('product', JSON.stringify(userProduct)); //Afficher à l'écran de l'utilisateur les modifications de son panier

      alert('Votre produit a été supprimer avec succès');
      location.href = 'panier.html';
    });
  };

  for (var i = 0; i < deleteBtn.length; i++) {
    _loop(i);
  }
};

deleteCardItem(); //Supprimer tous éléménts du panier

var deleteCardAllItem = function deleteCardAllItem() {
  var deleteAllItem = document.querySelector('#clear'); //Fonction pour vider le panier

  var deleteItem = function deleteItem() {
    localStorage.removeItem('product');
    localStorage.removeItem('cartCount');
    alert('Le panier a été vidé avec succès'); //Actualiser la page après suppression des données

    location.href = "panier.html";
  }; //Button pour vider le panier


  deleteAllItem.addEventListener("click", function (e) {
    e.preventDefault();

    if (userProduct) {
      deleteItem(); // console.log('Je suis vide');
    }
  });
};

deleteCardAllItem(); //Additionner le prix des articles 

var allItemPrice = []; //Faire le total des prix des différents produits 

var addProductTotalPrice = function addProductTotalPrice() {
  //Récupéter les prix dans le localStorage
  for (var price in userProduct) {
    //Stocker les prix du localStorage
    var itemPrice = userProduct[price].price; //Ajouter les prix dans un tableau

    allItemPrice.push(itemPrice);

    var reducer = function reducer(accumulator, currentValue) {
      return accumulator + currentValue;
    };

    var priceTotal = allItemPrice.reduce(reducer);
    var tablePrice = document.getElementById('total__price');
    var totalPrice = "\n    <table class=\"total-table\">\n       <tr>\n        <td>Montant total</td>\n        <td class=\"cart-total-price\">".concat(priceTotal, " \u20AC</td>\n    </tr>\n    </table>\n    "); // Afficher le prix sur le navigateur

    tablePrice.insertAdjacentHTML('beforeend', totalPrice);
    localStorage.setItem('priceTotal', JSON.stringify(priceTotal));
  }
};

addProductTotalPrice(); //Afficher le formulaire sur le navigateur

var displayForm = function displayForm() {
  var formEl = document.querySelector('#card'); //console.log(formEl);

  var form = "\n   <div class=\"title__container\">\n            <h2>Finaliser votre commande</h2>\n          </div>\n          </div>\n          <div class=\"form__container\">\n         <form>\n      <div class=\"pseudo-container\">\n        <label for=\"firstname\">firstName</label>\n        <input type=\"text\" id=\"firstname\"  autocomplete=\"off\" />\n        <span class=\"span\"></span>\n      </div>\n\n      <div class=\"lastname-container \">\n        <label for=\"lastname\">lastName</label>\n        <input type=\"text\" id=\"lastname\"   autocomplete=\"off\" />\n        <span class=\"span\"></span>\n      </div>\n       \n      <div class=\"adresse-container\">\n        <label for=\"address\">adress</label>\n        <input type=\"text\" id=\"address\"  autocomplete=\"off\" />\n        <span class=\"span\"></span>\n      </div>\n\n       <div class=\"city-container \">\n        <label for=\"city\">city</label>\n        <input type=\"text\" id=\"city\" autocomplete=\"off\" />\n        <span class=\"span\"></span>\n      </div>\n\n      <div class=\"email-container\">\n        <label for=\"email\">email</label>\n        <input type=\"text\" id=\"email\" autocomplete=\"off\" />\n        <span class=\"span\">Email incorrect</span>\n      </div>\n\n      <input type=\"submit\" value=\"Valider\" id=\"btn-valid\" />\n    </form>\n        </div>\n      \n      <div class=\"card__button\">\n        <a class=\"card__button__shop\" href=\"produit.html\"\n          >Continuez le shopping</a\n        >\n      </div>\n \n      ";
  formEl.insertAdjacentHTML('afterend', form);
};

displayForm(); //Récupérer les informations du formaulaire

var confirmBtn = document.querySelector('#btn-valid');
var inputs = document.querySelectorAll('input[type="text"]');
var firstName, lastName, address, city, email;
var form = document.querySelector('form'); //console.log(form);

var getFormValues = function getFormValues() {
  //Afficher le message d'erreur si la valeur de l'utlisateur n'est pas valide
  function formErrorDisplay() {
    //displayForm();
    var errorDisplay = function errorDisplay(tag, message, valid) {
      var container = document.querySelector(".".concat(tag, "-container"));
      var span = document.querySelector(".".concat(tag, "-container > span"));

      if (!valid) {
        container.classList.add('error');
        span.textContent = message;
      } else {
        container.classList.remove('error');
        span.textContent = message;
      }
    }; //Récupérer les données saisis dans le champ adresse


    var adresseChecker = function adresseChecker(value) {
      if (value.length > 0 && (value.length < 3 || value.length > 40)) {
        errorDisplay('adresse', "Votre adresse doit etre entre 3 et 10 caractères");
        address = null;
      } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('adresse', "Votre adresse  ne doit pas contenir de caractères spéciaux");
        address = null;
      } else {
        errorDisplay('adresse', '', true);
        address = value;
      }
    }; //Récupérer les données saisis dans le champ email


    var emailChecker = function emailChecker(value) {
      if (!value.match(/^[\w_-]+@+[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay('email', "Le mail n'est pas valide");
        email = null;
      } else {
        errorDisplay('email', '', true);
        email = value;
      }
    }; //Récupérer les données saisis dans le champ city


    var cityChecker = function cityChecker(value) {
      if (value.length > 0 && (value.length < 3 || value.length > 10)) {
        errorDisplay('city', "Votre ville doit etre entre 3 et 10 caractères");
        city = null;
      } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('city', "Votre ville  ne doit pas contenir de caractères spéciaux");
        city = null;
      } else {
        errorDisplay('city', '', true);
        city = value;
      }
    }; //Récupérer les données saisis dans le champ firstName


    var userChecker = function userChecker(value) {
      //console.log(value);
      //Si le numéro de l'utilsateur ne respecte pas les conditions requises 
      if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay('pseudo', 'Le nom doit etre entre 3 et 20 caractères');
        firstName = null; //console.log(pseudo);
      } //SI le nom de l'utilisateur contient des caractères spéciaux
      else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
          errorDisplay('pseudo', 'Votre nom ne doit pas contenir de caractères spéciaux ');
          firstName = null;
        } else {
          errorDisplay('pseudo', '', true);
          firstName = value; //lastName = value;
        }
    }; //Récupérer les données saisis dans le champ LastName


    var LastNameChecker = function LastNameChecker(value) {
      if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay('lastname', "Votre prenom doit etre entre 3 et 20 caractères");
        lastName = null;
      } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay('lastname', "Votre prenom ne doit pas contenir de caractères spéciaux");
        lastName = null;
      } else {
        errorDisplay('lastname', '', true);
        lastName = value;
      }
    }; //console.log(userFirstName(e.target.value));
    //Récupérer les valeurs des inputs et les stocker dans une boucle


    inputs.forEach(function (input) {
      input.addEventListener('input', function (e) {
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

  formErrorDisplay(); //Ajouter un évènements sur le button 

  form.addEventListener('submit', function (e) {
    e.preventDefault(); //Récupérer les données des champs du formulaire

    var Form = function Form() {
      _classCallCheck(this, Form);

      this.firstName = document.querySelector('#firstname').value;
      this.lastName = document.querySelector('#lastname').value;
      this.address = document.querySelector('#address').value;
      this.city = document.querySelector('#city').value;
      this.email = document.querySelector('#email').value;
    };

    var contact = new Form(); //console.log(contact)

    localStorage.setItem('contact', JSON.stringify(contact)); //console.log(contact);

    if (contact) {
      //console.log(contact)
      localStorage.setItem('contact', JSON.stringify(contact));
      inputs.forEach(function (input) {
        return input.value = "";
      });
    } else {
      alert('Veuillez remplir le formulaire Svp!');
    } //Stocker les id de tous les produits dans le tableau


    var products = []; //console.log(products);

    for (var i = 0; i < userProduct.length; i++) {
      var productId = userProduct[i].idProduct; //console.log(productId);

      products.push(productId);
    }

    console.log("products");
    console.log(products); //Envoyer dans le localStorage les informations du formulaires
    //Envoyer les informations (Produits + infos du formulaire) de l'utilisateur dans le localStorage

    var sendOrder = JSON.stringify({
      contact: contact,
      products: products
    });
    console.log(sendOrder); //Envoyer les données sur le serveur

    var send = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: sendOrder
    };
    fetch('http://localhost:3000/api/teddies/order', send).then(function _callee(response) {
      var res, orderId;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(response.json());

            case 3:
              res = _context.sent;

              //Si la reponse HTTP est 201 
              if (response.ok) {
                //Récupéer l'ID de la commande 
                orderId = res.orderId;
                console.log(orderId); //Enregistrer les données dans le LocalStorage

                localStorage.setItem('orderId', JSON.stringify(orderId));
                localStorage.setItem('contact', JSON.stringify(contact)); //Rédiriger vers la page confirmation de la commande

                location.assign('confirmation.html?orderID=' + orderId);
              } else {
                alert(" Une erreur est survenue votre panier est peut être vide ou le formulaire n'a pas été correctement remplit!");
              }

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error(error);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    });
    console.log(send);
  });
};

getFormValues();