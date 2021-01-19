import { TableColumn } from "../../models/tablecolumn.ts";
import { Product } from "../../models/product.ts";

export async function loadTable(){
    const table = document.querySelector("table");

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
        tdProduct.innerHTML = product.productName;
        tdEinzelpreis.innerHTML = product.specialOffer.toString();
        tdAnzahl.innerHTML = "<button>-</button>1<button>+</button>"
        tdTotal.innerHTML = "2";
        table.appendChild(tr);
    }
}