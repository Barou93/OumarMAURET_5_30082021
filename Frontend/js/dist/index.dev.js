"use strict";

//Lien de l'API
//http://localhost:3000/api/teddies;
//Tableau pour stocker tous les produits
var products = []; //Selection des produits à afficher au choix entre : "cameras" - "furniture" - "teddies"

var productSellId = 'teddies'; //Recupérer l'API et le stocker dans une variable 

var APIURL = 'http://localhost:3000/api/' + productSellId + "/"; //Recupérer les donnés  de l'API

var getProducts = function getProducts() {
  return regeneratorRuntime.async(function getProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(APIURL).then(function (res) {
            return res.json();
          }).then(function (data) {
            return products = data;
          }));

        case 2:
          console.log(products);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Afficher les produits de l'API sur le navigateur 


var displayAllProducts = function displayAllProducts() {
  var productContainer;
  return regeneratorRuntime.async(function displayAllProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getProducts());

        case 2:
          productContainer = document.getElementById('product__contain'); //Récupérer tous les produits dans une map et les afficher

          productContainer.innerHTML = products.map(function (product) {
            return "\n      <div class=\"products__container\">\n                <a href=\"./produit.html?id=".concat(product._id, " \">\n                    <div class=\"products__item\">\n                    <div class=\"products__name\">\n                        <h2>").concat(product.name, "</h2>\n                        <p>").concat(product.price / 100, " \u20AC</p>\n                    </div>\n                    <img src=\"").concat(product.imageUrl, "\" alt=\"photo de ").concat(product.name, " \" />\n                    </div>\n                    <div class=\"products__card\">\n                     <p>").concat(product.description, "</p>\n                   <a href=\"./produit.html?id=").concat(product._id, "\" class=\"add_card\">Commander</a>\n                </div>\n            </a>\n        </div>\n    ");
          }).join("");

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

displayAllProducts();