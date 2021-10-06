//Lien de l'API

//http://localhost:3000/api/teddies;

let products = [];
//Selection des produits à afficher au choix entre : "cameras" - "furniture" - "teddies"
let productSellId = 'teddies';

let APIURL = 'http://localhost:3000/api/' + productSellId + "/";
let productID = "";


const getProducts = (products) => {


}

async function getApi() {

    await fetch(APIURL)
        .then((res) => res.json())
        .then((data) => products = data[0]);

    console.log(products);

}


console.log(getApi());