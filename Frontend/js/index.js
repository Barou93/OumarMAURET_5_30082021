//Lien de l'API

//http://localhost:3000/api/teddies;

async function getApi() {

    await fetch('http://localhost:3000/api/teddies')
        .then((res) => res.json())
        .then((data) => console.log(data));

}
console.log(getApi());