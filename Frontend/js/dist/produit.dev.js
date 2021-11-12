"use strict";

//Afficher les détails par produits sélectionner
//Tableau vide dans lequel les produts selectionner seront stocker
var productDetail = []; //Récuperation de la chaîne de requete dans l'URL

var queryStringUrlID = location.search; //Récupérer le nom de l'id de l'URL

var urlSearchParams = new URLSearchParams(queryStringUrlID); //Affichage de l'ID du produit selectionner

var productID = urlSearchParams.get('id'); //Affichage du produit contenu dans l'Objet qui a été sélectionner par l'ID
//Récupérer les produits de l'API

var URL = 'http://localhost:3000/api/teddies' + '/' + productID; //Récupéter les informations de l'API 

var getProductsData = function getProductsData() {
  return regeneratorRuntime.async(function getProductsData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(URL).then(function (res) {
            return res.json();
          }).then(function (data) {
            return productDetail = data;
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Afficher le produit selectionner à l'aide de l'ID du produit


var displayProductsDetail = function displayProductsDetail() {
  var productItem;
  return regeneratorRuntime.async(function displayProductsDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getProductsData());

        case 2:
          productItem = document.getElementById('productItem'); // Récupérer le produit pqr son ID et l'afficher sur le navigateur

          productItem.innerHTML = "\n        <div class=\"products__item__container\">\n        <div class=\"products__item__img__container\">\n          <div class=\"products__item__image\">\n            <img\n              src=\" ".concat(productDetail.imageUrl, "\"\n              alt=\"photo de ").concat(productDetail.name, " \"\n            />\n          </div>\n        </div>\n        <div class=\"products__item__description__container\">\n          <div class=\"products__item__descriptions\">\n            <h2> ").concat(productDetail.name, "</h2>\n            <span class=\"price\">").concat(productDetail.price / 100, " \u20AC </span>\n            <p>D\xE9tails du produit</p>\n            <p class=\"description\">").concat(productDetail.description, " </p>\n          </div>\n           <div class=\"products__item__details\">\n            <h2>Choisissez votre mod\xE8le</h2>\n          </div>\n          <div class=\"products__item__select\">\n                <select id=\"select\" name=\"select\">    \n            </select>\n          </div>\n          <div class=\"products__item__card\">\n              <a href=\"# \" class=\"products__item__card__button\">Ajouter au panier</a>\n            </select>\n          </div>\n        </div>\n      </div>\n      ");

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var UpdateQuantityValue = function UpdateQuantityValue() {
  var productQuantity, number, quantityHTML, quantityNum, addBtnArr, deducBtnArr, addBtn, deducBtn, changeCartQuantity;
  return regeneratorRuntime.async(function UpdateQuantityValue$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          changeCartQuantity = function _ref3() {
            addBtnArr.addEventListener('click', addBtn);
            deducBtnArr.addEventListener('click', deducBtn);
          };

          deducBtn = function _ref2() {
            //let count = parseInt(minus);
            if (number === 1) {
              number = 1;
            } else {
              number = number - 1;
              quantityNum.innerHTML = number;
              console.log(number);
            }
          };

          addBtn = function _ref() {
            //let count = parseInt(plus.innerText);
            if (isNaN(number) || number <= 0) {
              number = 1;
            } else {
              number = number + 1;
              quantityNum.innerHTML = number;
              console.log(number);
            }
          };

          productQuantity = document.querySelector('.products__item__card');
          number = 1; //console.log(productQuantity);

          quantityHTML = "\n   <div class=\"quantity_container\">\n           <div class=\"qte-minus\" id=\"minus\"></div>\n          <span type=\"number\" class=\"number\" id=\"quantite_produit\">".concat(number, "</span>\n          <div class=\"qte-plus\" id=\"plus\"></div>\n           </div>\n  ");
          productQuantity.insertAdjacentHTML("beforebegin", quantityHTML);
          quantityNum = document.getElementById('quantite_produit'); //let quantityContainer = document.querySelector('.quantity_container');

          addBtnArr = document.getElementById('plus');
          deducBtnArr = document.getElementById('minus');
          console.log(addBtnArr, deducBtnArr);
          number = quantityNum; //console.log(number);
          //Ajouter une nouvelle quantité au produit selectionner 

          changeCartQuantity();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //Variable ou la quantité du panier sera stocker


var articleItem = document.querySelector('.count');
console.log(articleItem); //Afficher la quantité de produit dans le panier après rafraichissement de la page

function onLoadPage() {
  var productNumbers = localStorage.getItem('cartCount');

  if (productNumbers) {
    articleItem.style.display = 'inline-block';
    articleItem.textContent = productNumbers;
  }
} //Afficher sur l'icone panier le nombre de produit ajouter dans le panier


function inCart() {
  var productNumbers = localStorage.getItem('cartCount');
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartCount', productNumbers + 1);
    articleItem.style.display = 'inline-block';
    articleItem.textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartCount', 1);
    articleItem.textContent = 1;
  }
}

onLoadPage(); //Ajouter le produit selectionner avec les options dans le panier de l'utitisateur

var addUserProductSelect = function addUserProductSelect() {
  var selectID, quantityValue, userOptionCheck, options, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, option, addUserSelection, btnAddToCart;

  return regeneratorRuntime.async(function addUserProductSelect$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(displayProductsDetail());

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(UpdateQuantityValue());

        case 4:
          //Selectionner l'ID du formulaire
          selectID = document.getElementById('select');
          quantityValue = document.getElementById('quantite_produit'); //Stocker le choix de des options de  l'USER dans une variable

          userOptionCheck = productDetail.colors; //Tableau vide dans lequel les options choisis par l'utilisateur seront stocker

          options = []; //Ajouter les différentes options pour que l'utilisateur puisse le selectionner

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 11;

          for (_iterator = userOptionCheck[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            option = _step.value;
            options += "\n     \n     <option value=\"".concat(option, "\" class=\"option \">").concat(option, "</option>\n     \n    ");
          } //Afficher les options coleur sur le navigateur de l'utilisateur


          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 19:
          _context4.prev = 19;
          _context4.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context4.prev = 22;

          if (!_didIteratorError) {
            _context4.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context4.finish(22);

        case 26:
          return _context4.finish(19);

        case 27:
          addUserSelection = document.getElementById('select');
          addUserSelection.innerHTML = options; //Selectionner le BUTTON pour ajouter l'article dans le panier

          btnAddToCart = document.querySelector('.products__item__card__button'); //Ajouter un événement sur le button lors du click

          btnAddToCart.addEventListener('click', function (e) {
            e.preventDefault();
            var userFormSelect = selectID.value;
            var quantity = parseInt(quantityValue.innerText); //Afficher l'icone panier la quantité de produit ajouter au panier

            inCart(); //Récupérer les valeurs du produits et le mettre dans le panier

            var getProduct = {
              productName: productDetail.name,
              productImg: productDetail.imageUrl,
              idProduct: productDetail._id,
              productOption: userFormSelect,
              quantity: quantity,
              price: productDetail.price * quantity / 100
            };
            console.log(getProduct); //Validation de la commande 

            var confirmCard = function confirmCard() {
              if (confirm("".concat(productDetail.name, "  couleur : ").concat(userFormSelect, "  a \xE9t\xE9 ajouter \xE0 votre panier\n    pour consulter appuyer sur Ok  et annuler pour continuer vos achats"))) {
                location.href = 'panier.html';
              } else {
                location.href = 'produit.html?/' + id;
              }
            }; //Fonction qui permet de stocker les articles de l'utilisateur sur le localStorage


            var userCardItem = function userCardItem() {
              //Ajout dans le tableau de l'objet avec ses values 
              userProduct.push(getProduct);
              localStorage.setItem('product', JSON.stringify(userProduct));
            };

            var userProduct = JSON.parse(localStorage.getItem('product')); //La methode JSON.parse transforme une chaîne JSON en un objet JavaScript
            //Si il y'a  déja  des produits enregristrer dans le localStorage 

            if (userProduct) {
              userCardItem();
              console.log(userProduct);
              confirmCard();
            } //S'il y'a pas de produit enregistrer dans le localStorage
            else {
                userProduct = [];
                userCardItem();
                console.log(userProduct);
                confirmCard();
              }
          });

        case 31:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[11, 15, 19, 27], [20,, 22, 26]]);
};

addUserProductSelect();