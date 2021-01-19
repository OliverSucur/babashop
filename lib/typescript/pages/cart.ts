import { TableColumn } from "../../models/tablecolumn.ts";
import { Product } from "../../models/product.ts";

export async function loadTable(){
    document.querySelector("#cart-back-button").innerHTML = "";

    const table = document.querySelector("table");
    table.innerHTML = "";
    const responseTableColumns = await fetch("/babashop/cart/tablecolumns");
    const tablecolumns: TableColumn[] = await responseTableColumns.json();

    const trTitle = document.createElement("tr");
    const tdProductTitle = trTitle.appendChild(document.createElement("th"));
    const tdEinzelpreisTitle = trTitle.appendChild(document.createElement("th"));
    const tdAnzahlTitle = trTitle.appendChild(document.createElement("th"));
    const tdTotalTitle = trTitle.appendChild(document.createElement("th"));

    tdProductTitle.innerHTML = tablecolumns[0].title;
    tdEinzelpreisTitle.innerHTML = tablecolumns[1].title;
    tdAnzahlTitle.innerHTML = tablecolumns[2].title;
    tdTotalTitle.innerHTML = tablecolumns[3].title;

    table.appendChild(trTitle);

    const buttonBack = document.createElement("button");
    buttonBack.innerHTML = "Zurück";
    buttonBack.id = "btn-back";
    document.querySelector("#cart-back-button").appendChild(buttonBack);
    document.querySelector("#btn-back").addEventListener("click", () => {
        location.href = "./../../index.html";
    });

    const buttonOrder = document.createElement("button");
    buttonOrder.innerHTML = "Bestellen";
    buttonOrder.id = "btn-order";
    document.querySelector("#cart-back-button").appendChild(buttonOrder);
    document.querySelector("#btn-order").addEventListener("click", () => {
        location.href = "./order.html";
    });

    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts: Product[] = await responseCartProducts.json();
    
    const filteredProducts: Product[] = [];
    for(let i = 0; i < cartProducts.length; i++){
        let currProduct = cartProducts[i];
        console.log(currProduct);
        if(filteredProducts.find(e => e.id == currProduct.id)){
            continue;
        }else{
            filteredProducts.push(currProduct);
        }
    }

    console.log(filteredProducts); 
    for(const product of filteredProducts){
        const tr = document.createElement("tr");
        const tdProduct = tr.appendChild(document.createElement("td"));
        const tdEinzelpreis = tr.appendChild(document.createElement("td"));
        const tdAnzahl = tr.appendChild(document.createElement("td"));
        const tdTotal = tr.appendChild(document.createElement("td"));
        let anzahl:number;
        anzahl = await getAnzahl(product);
        tdProduct.innerHTML = product.productName;
        tdEinzelpreis.innerHTML = `CHF ${product.specialOffer.toFixed(2)}`;
        tdAnzahl.innerHTML = `<button id="btn-deleteAnzahl-${product.productName}">-</button>${anzahl}<button id="btn-addAnzahl-${product.productName}">+</button>`
        tdTotal.innerHTML = `CHF ${(product.specialOffer*anzahl).toFixed(2)}`;
        table.appendChild(tr);
    }

    for(const product of filteredProducts){
        document.getElementById(`btn-deleteAnzahl-${product.productName}`).addEventListener("click", async () => {
            await fetch(`/babashop/cart/products/remove${product.id}`, { method: "DELETE" });
            loadTable();
        });
    }

    for(const product of filteredProducts){
        document.getElementById(`btn-addAnzahl-${product.productName}`).addEventListener("click", async () => {
            await fetch(
                "/babashop/cart",
                {
                    method: "POST",
                    body: JSON.stringify(product),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            loadTable();
        });
    }

    const tr = document.createElement("tr");
    const tdProduct = tr.appendChild(document.createElement("td"));
    const tdEinzelpreis = tr.appendChild(document.createElement("td"));
    const tdAnzahl = tr.appendChild(document.createElement("td"));
    const tdTotal = tr.appendChild(document.createElement("td"));
    const responseTotal = await fetch("/babashop/cart/products/total");
    const total:Promise<number> = responseTotal.json();
    if(await total != 0){
        tdTotal.innerHTML =  `CHF ${(await total).toFixed(2)}`;
    }
    table.appendChild(tr);
}

async function getAnzahl(product: Product): Promise<number>{
    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts: Product[] = await responseCartProducts.json();

    const anzahl = cartProducts.filter(e => e.id == product.id).length;
    console.log(anzahl);
    return anzahl;
}
