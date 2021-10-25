//Lien de l'API
//http://localhost:3000/api/teddies;
//Tableau pour stocker tous les produits
let products = [];
//Selection des produits à afficher au choix entre : "cameras" - "furniture" - "teddies"
let productSellId = 'teddies';

//Recupérer l'API et le stocker dans une variable 
let APIURL = 'http://localhost:3000/api/' + productSellId + "/";



//Recupérer les donnés  de l'API

const getProducts = async () => {
    await fetch(APIURL)

        .then((res) => res.json())
        .then((data) => products = data)

    console.log(products);
}



//Afficher les produits de l'API sur le navigateur 

const displayAllProducts = async () => {
    await getProducts();

    let productContainer = document.getElementById('product__contain');
    //Récupérer tous les produits dans une map et les afficher
    productContainer.innerHTML = products.map((product) =>

        `
      <div class="products__container">
                <a href="./produit.html?id=${product._id} ">
                    <div class="products__item">
                    <div class="products__name">
                        <h2>${product.name}</h2>
                        <p>${product.price / 100} €</p>
                    </div>
                    <img src="${product.imageUrl}" alt="photo de ${product.name} " />
                    </div>
                    <div class="products__card">
                    <a href="./produit.html?id=${product._id} " class="infos"
                        >En savoir plus</a
                    >
                <a href="./produit.html?id=${product._id}" class="add_card">Commander</a>
                </div>
            </a>
        </div>
    `
    ).join("")

}

displayAllProducts();