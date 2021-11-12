"use strict";

//Récupération des données de L'URL
var paramsUrl = new URL(location).searchParams;
var order = paramsUrl.get("orderId"); //Récupérer l'id de la commande

var orderId = JSON.parse(localStorage.getItem('orderId')); //Récupérer des informations du formulaire

var contact = JSON.parse(localStorage.getItem('contact')); //Récuperations du prix total de la commande

var total = JSON.parse(localStorage.getItem('priceTotal'));

var display = function display() {
  var confirm = document.querySelector('.checkout__container__title');
  confirm.innerHTML = "<h1>\n            F\xE9licitation <span id=\"userid\">".concat(contact.firstName, ", ").concat(contact.lastName, "</span>\n        </h1>\n        <p>votre commande : <span id=\"orderid\">").concat(orderId, "</span> a \xE9t\xE9 bien re\xE7u avec succ\xE8s</br>\n         <hr>\n        D'un montant de :").concat(total, "\u20AC  </br>\n        </p>\n        Un email vous sera envoyer \xE0 l'adresse : </br> ").concat(contact.email, " a l'envoi de votre commande\n    \n    ");
};

display(); //Supprimer les données stocker dans le localStorage

var removeStorage = function removeStorage(key) {
  localStorage.removeItem(key);
};

removeStorage('orderId');
removeStorage('cartCount');
removeStorage('total'); //Rédigier l'utilisateur vers la page accueil après la commande

if (orderId == null || total == null) {
  location.href = 'index.html';
  localStorage.clear();
}