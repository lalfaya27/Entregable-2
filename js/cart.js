let productUnitCost = 0;
let productCurrency = "$";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let PERCENTAGE_SYMBOL = '%';
let array = [];
var carro = [];

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {

    let totalHTML = document.getElementById("totalCost");
    total = (subtotal * (1 + shippingPercentage)).toFixed(2);

    totalHTML.innerHTML = " " + "Costo Total:" + " " + productCurrency + total;
}

function updateShippingCost() {

    let shippingHTML = document.getElementById("shippingCost");
    shipping = (subtotal * shippingPercentage).toFixed(2);

    shippingHTML.innerHTML = " " + "Costo Envío:" + " " + productCurrency + shipping;
}


//función que muestra producto a comprar
function showProductsBuy(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let article = array[i];

        productCount = article.count
        productPrice = article.unitCost

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src= "${article.src}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="text-center">`+ article.name + `</h4>
                    </div>
                    <br>
                    <p class="mb-1"> Precio: `+ article.currency + " " + article.unitCost + `</p>
                    <div class="row container p-0 m-4"></div>
                        <p class="d-flex w-100 justify-content-between" id="sortByPrice">Cantidad de Artículos a Comprar:</p>
                        <input class="form-control" type="number" style='width:200px; height:25px' placeholder="num" id="numeroArticulos" value=`+ article.count + `>
                    </div>
                </div>
            </div>
        </div>
        `


        document.getElementById("productoComprar").innerHTML = htmlContentToAppend;

    }
}

function updateSubtotal() {
    let subtotalHTML = document.getElementById("subtotalCost");
    subtotal = (productPrice * productCount).toFixed(2);

    subtotalHTML.innerHTML = " " + "Costo Subtotal:" + " " + productCurrency + subtotal;
}

function showPaymentTypeNotSelected() {

}

function hidePaymentTypeNotSelected() {

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carro = resultObj.data;

            showProductsBuy(carro.articles);
            updateSubtotal(carro.articles);
            updateTotalCosts();
            updateShippingCost();
        }

        document.getElementById("numeroArticulos").addEventListener("change", function () {
            productCount = parseInt(document.getElementById('numeroArticulos').value)
            updateSubtotal(carro.artcicles);
            updateTotalCosts();
            updateShippingCost()
        });

        document.getElementById("premiumRadio").addEventListener("change", function () {
            shippingPercentage = 0.15;
            updateShippingCost();
            updateTotalCosts();
        });

        document.getElementById("expressRadio").addEventListener("change", function () {
            shippingPercentage = 0.07;
            updateShippingCost();
            updateTotalCosts();
        });

        document.getElementById("standardRadio").addEventListener("change", function () {
            shippingPercentage = 0.05;
            updateShippingCost();
            updateTotalCosts();
        });
    });
});
document.addEventListener('DOMContentLoaded', function(){
    let form=document.getElementById('fcompra');
     form.addEventListener("submit", function(evento) {
            evento.preventDefault()
    });
    if (document.getElementById("creditCardPaymentRadio").checked==true);
    document.getElementById("bankingRadio").hidden==true;
});