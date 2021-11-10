//Récupération des données de L'URL
let paramsUrl = new URL(location).searchParams;

let order = paramsUrl.get("orderId");
//console.log(order)


//Récupérer l'id de la commande
let orderId = JSON.parse(localStorage.getItem('orderId'))

//Récupérer des informations du formulaire
let contact = JSON.parse(localStorage.getItem('contact'));
console.log(contact)

//Récuperations du prix total de la commande
let total = JSON.parse(localStorage.getItem('priceTotal'));
console.log(total)

const display = () => {
    const confirm = document.querySelector('.checkout__container__title');
    confirm.innerHTML =

        `<h1>
            Félicitation <span id="userid">${contact.firstName}, ${contact.lastName}</span>
        </h1>
        <p>votre commande : <span id="orderid">${orderId}</span> a été bien reçu avec succès</br>
         <hr>
        D'un montant de :${total}€  </br>
        </p>
        Un email vous sera envoyer à l'adresse : </br> ${contact.email} a l'envoi de votre commande
    
    `
}

display();