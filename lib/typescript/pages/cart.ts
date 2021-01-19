import { TableColumn } from "../../models/tablecolumn.ts";
import { Product } from "../../models/product.ts";
import { AnzahlCartProducts } from "../../models/anzahl.ts";

export async function loadTable(){
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

    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts: Product[] = await responseCartProducts.json();

    for(const product of cartProducts){
        const tr = document.createElement("tr");
        const tdProduct = tr.appendChild(document.createElement("td"));
        const tdEinzelpreis = tr.appendChild(document.createElement("td"));
        const tdAnzahl = tr.appendChild(document.createElement("td"));
        const tdTotal = tr.appendChild(document.createElement("td"));
        let anzahl:number;
        anzahl = await getAnzahl(product);
        tdProduct.innerHTML = product.productName;
        tdEinzelpreis.innerHTML = product.specialOffer.toString();
        tdAnzahl.innerHTML = `<button id="btn-deleteAnzahl-${product.productName}">-</button>${anzahl}<button id="btn-addAnzahl${product.productName}">+</button>`
        tdTotal.innerHTML = `${product.specialOffer*anzahl}`;
        table.appendChild(tr);
    }

    for(const product of cartProducts){
        document.getElementById(`btn-deleteAnzahl-${product.productName}`).addEventListener("click", async () => {
            await fetch(`/babashop/cart/products/remove:${product.id}`, { method: "DELETE" });
            loadTable();
        });
    }
}

async function getAnzahl(product: Product): Promise<number>{
    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts: Product[] = await responseCartProducts.json();

    const anzahl = cartProducts.filter(e => e.id == product.id).length;
    console.log(anzahl);
    return anzahl;
}

async function deleteProduct(product: Product){
    await fetch(`/babashop/cart/products/remove:${product.id}`, { method: "DELETE" });
    await loadTable();
}