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
var cart= [];

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {
    
    let totalHTML=document.getElementById("totalCost");
    total=(subtotal*(1+shippingPercentage)).toFixed(2);

    totalHTML.innerHTML= " " + "Costo Total:"+ productCurrency + total;
}

function updateShippingCost() {

    let shippingHTML=document.getElementById ("shippingCost");
    shipping=(subtotal*shippingPercentage).toFixed(2);

    shippingHTML.innerHTML= " " + "Costo Envío:" + productCurrency + shipping;
}

//función que muestra producto a comprar
function showProductsBuy(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let article = array[i];

        productCount=article.count
        productPrice=article.unitCost

        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src= "${article.src}" class="img-thumbnail">
            </div>
        <div class="col">
                <div class="d-flex w-100 justify-content-between">
                        <h4 class="text-center">`+ article.name +`</h4>
                    </div>
                    <br>
                    <p class="mb-1"> Precio: `+ article.currency + " "  + article.unitCost + `</p>
                      <div class="row container p-0 m-0"></div>
                        <div class="col">
                          <p class="text-center" id="sortByPrice">Cantidad de Artículos a Comprar:</p>
                        </div>
                        <div class="col">
                          <input class="form-control" type="number" placeholder="num" id="rangeFilterNumber" value=`+ article.count +`>
                        </div>
                        </div
                </div>
            </div>
        </a>
        `


        document.getElementById("productoComprar").innerHTML = htmlContentToAppend;

    }
} 

function updateSubtotal() {
    let subtotalHTML=document.getElementById("subtotalCost");
    subtotal=(productPrice*productCount);

    subtotalHTML.innerHTML= "Costo Subtotal:"+ " " + productCurrency + subtotal;
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
            cart=resultObj.data;

            showProductsBuy(cart.articles);
            updateSubtotal(cart.articles);
            updateTotalCosts();
            updateShippingCost();


        }
                
        document.getElementById("rangeFilterNumber").addEventListener("change", function (){
            productCount= parseInt(document.getElementById('rangeFilterNumber').value)
            updateSubtotal(cart.artcicles);
            updateTotalCosts();
            updateShippingCost()
        })


    });
})
