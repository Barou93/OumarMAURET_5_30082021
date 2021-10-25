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


//Récupéter les informations de l'API 
const getProductsData = async () => {
  await fetch(URL)
    .then((res) => res.json())
    .then((data) => productDetail = data)
  console.log(productDetail);

}

//Afficher le produit selectionner à l'aide de l'ID du produit
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
            </select>
          </div>
          <div class="products__item__card">
              <a href="# " class="products__item__card__button">Ajouter au panier</a>
            </select>
          </div>
        </div>
      </div>
      `

};

const UpdateQuantityValue = async () => {

  const productQuantity = document.querySelector('.products__item__card');
  let number = 1;
  //console.log(productQuantity);

  let quantityHTML = `
   <div class="quantity_container">
           <div class="qte-minus" id="minus"></div>
          <span type="number" class="number" id="quantite_produit">${number}</span>
          <div class="qte-plus" id="plus"></div>
           </div>
  `

  productQuantity.insertAdjacentHTML("beforebegin", quantityHTML);
  let quantityNum = document.getElementById('quantite_produit');

  console.log(typeof quantityNum);
  //let quantityContainer = document.querySelector('.quantity_container');
  let addBtnArr = document.getElementById('plus');
  let deducBtnArr = document.getElementById('minus');
  console.log(addBtnArr, deducBtnArr);
  number = quantityNum;

  //console.log(number);
  //Ajouter une nouvelle quantité au produit selectionner 
  function addBtn() {
    //let count = parseInt(plus.innerText);
    if (isNaN(number) || number <= 0) {
      number = 1;

    } else {
      number = number + 1;
      quantityNum.innerHTML = number;
      console.log(number);

    }
  }
  //Diminuer la quantité du produit selectionner si cette valeur est superieur à 1
  function deducBtn() {
    //let count = parseInt(minus);
    if (number === 1) {
      number = 1;
    } else {
      number = number - 1;
      quantityNum.innerHTML = number;
      console.log(number);

    }
  }

  //Fonction permet d'ajouter et de dimmunier la quantité du produit de l'utilisateur
  function changeCartQuantity() {
    addBtnArr.addEventListener('click', addBtn)

    deducBtnArr.addEventListener('click', deducBtn)
  }
  changeCartQuantity();

}
//Variable ou la quantité du panier sera stocker
const articleItem = document.querySelector('.count');
console.log(articleItem);

//Afficher la quantité de produit dans le panier après rafraichissement de la page
function onLoadPage() {
  let productNumbers = localStorage.getItem('cartCount');
  if (productNumbers) {
    articleItem.style.display = 'inline-block';
    articleItem.textContent = productNumbers;
  }
}
//Afficher sur l'icone panier le nombre de produit ajouter dans le panier
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

//Ajouter le produit selectionner avec les options dans le panier de l'utitisateur
const addUserProductSelect = async () => {
  await displayProductsDetail();
  await UpdateQuantityValue();
  //Selectionner l'ID du formulaire
  const selectID = document.getElementById('select');
  const quantityValue = document.getElementById('quantite_produit');
  //console.log(selectID);
  console.log(parseInt(quantityValue.innerText));

  //Stocker le choix de des options de  l'USER dans une variable
  const userOptionCheck = productDetail.colors;

  //Tableau vide dans lequel les options choisis par l'utilisateur seront stocker
  let options = [];

  //Ajouter les différentes options pour que l'utilisateur puisse le selectionner
  for (let option of userOptionCheck) {
    options += `
     
     <option value="${option}" class="option ">${option}</option>
     
    `
  }
  //console.log(options);

  //Stocker les produits de l'utilisateur dans le localStorage


  //Afficher les options coleur sur le navigateur de l'utilisateur

  const addUserSelection = document.getElementById('select');

  addUserSelection.innerHTML = options;

  //Selectionner le BUTTON pour ajouter l'article dans le panier
  const btnAddToCart = document.querySelector('.products__item__card__button');
  //console.log(btnAddToCart);

  //Ajouter un événement sur le button lors du click
  btnAddToCart.addEventListener('click', (e) => {
    e.preventDefault();
    const userFormSelect = selectID.value;
    const quantity = parseInt(quantityValue.innerText);
    //console.log(quantity);

    //Afficher l'icone panier la quantité de produit ajouter au panier
    inCart();

    //Récupérer les valeurs du produits et le mettre dans le panier
    let getProduct = {
      productName: productDetail.name,
      productImg: productDetail.imageUrl,
      idProduct: productDetail._id,
      productOption: userFormSelect,
      quantity: quantity,
      price: (productDetail.price * quantity) / 100
    }
    console.log(getProduct);


    //Validation de la commande 
    const confirmCard = () => {
      if (confirm(`${productDetail.name}  couleur : ${userFormSelect}  a été ajouter à votre panier
    pour consulter appuyer sur Ok  et annuler pour continuer vos achats`)) {
        location.href = 'panier.html';


      }

      else {
        //confirmation()
        location.href = 'produit.html?' + id;
      }

    }
    //Fonction qui permet de stocker les articles de l'utilisateur sur le localStorage
    const userCardItem = () => {
      //Ajout dans le tableau de l'objet avec ses values 
      userProduct.push(getProduct);
      localStorage.setItem('product', JSON.stringify(userProduct));

    }


    let userProduct = JSON.parse(localStorage.getItem('product')); //La methode JSON.parse transforme une chaîne JSON en un objet JavaScript
    //let saveUserData = [];




    //Si il y'a  déja  des produits enregristrer dans le localStorage 
    if (userProduct) {
      //userProduct = [];
      userCardItem();
      console.log(userProduct);
      confirmCard();
      inCart();
    }
    //S'il y'a pas de produit enregistrer dans le localStorage
    else {
      userProduct = [];
      userCardItem();
      console.log(userProduct);
      confirmCard();
      inCart();
    }
  });
}

addUserProductSelect();



//Récupérer les données de la balise Select
