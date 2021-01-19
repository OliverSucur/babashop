async function productToCart(product) {
    await fetch("/babashop/cart", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
async function getAnzahl(product) {
    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts = await responseCartProducts.json();
    const anzahl = cartProducts.filter((e)=>e.id == product.id
    ).length;
    console.log(anzahl);
    return anzahl;
}
async function loadProducts2() {
    const responseProducts = await fetch("/babashop/products");
    const products = await responseProducts.json();
    const main = document.querySelector("main");
    const button = document.createElement("button");
    button.id = "btn-cart";
    button.innerHTML = "Warenkorb";
    const header = document.querySelector("header");
    header.appendChild(button);
    document.querySelector("#btn-cart").addEventListener("click", ()=>{
        location.href = "./lib/html/cart.html";
    });
    for (const product of products){
        const div = document.createElement("div");
        div.setAttribute("data-id", product.id);
        div.innerHTML = `\r\n            <div class="card">\r\n            <img src="./../assets/img/${product.imageName}" alt="Avatar" style="width:100%">\r\n            <div class="container">\r\n                <h4>${product.productName}</h4>\r\n                <p>${product.specialOffer} ${product.normalPrice}</p>\r\n                <button class="btn-addToCart" id="btn-id-${product.id}">Add to cart</button>\r\n            </div>\r\n            </div>\r\n        `;
        div.querySelector(".btn-addToCart").addEventListener("click", ()=>productToCart(product)
        );
        main.appendChild(div);
    }
}
const loadProducts1 = loadProducts2;
export { loadProducts1 as loadProducts };
async function loadTable2() {
    const table = document.querySelector("table");
    table.innerHTML = "";
    const responseTableColumns = await fetch("/babashop/cart/tablecolumns");
    const tablecolumns = await responseTableColumns.json();
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
    const cartProducts = await responseCartProducts.json();
    const filteredProducts = [];
    for(let i = 0; i < cartProducts.length; i++){
        let currProduct = cartProducts[i];
        console.log(currProduct);
        if (filteredProducts.find((e)=>e.id == currProduct.id
        )) {
            continue;
        } else {
            filteredProducts.push(currProduct);
        }
    }
    console.log(filteredProducts);
    for (const product of filteredProducts){
        const tr = document.createElement("tr");
        const tdProduct = tr.appendChild(document.createElement("td"));
        const tdEinzelpreis = tr.appendChild(document.createElement("td"));
        const tdAnzahl = tr.appendChild(document.createElement("td"));
        const tdTotal = tr.appendChild(document.createElement("td"));
        let anzahl;
        anzahl = await getAnzahl(product);
        tdProduct.innerHTML = product.productName;
        tdEinzelpreis.innerHTML = product.specialOffer.toString();
        tdAnzahl.innerHTML = `<button id="btn-deleteAnzahl-${product.productName}">-</button>${anzahl}<button id="btn-addAnzahl-${product.productName}">+</button>`;
        tdTotal.innerHTML = `${product.specialOffer * anzahl}`;
        table.appendChild(tr);
    }
    for (const product1 of filteredProducts){
        document.getElementById(`btn-deleteAnzahl-${product1.productName}`).addEventListener("click", async ()=>{
            await fetch(`/babashop/cart/products/remove:${product1.id}`, {
                method: "DELETE"
            });
            loadTable2();
        });
    }
    for (const product2 of filteredProducts){
        document.getElementById(`btn-addAnzahl-${product2.productName}`).addEventListener("click", async ()=>{
            await fetch("/babashop/cart", {
                method: "POST",
                body: JSON.stringify(product2),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            loadTable2();
        });
    }
    const tr = document.createElement("tr");
    const tdProduct = tr.appendChild(document.createElement("td"));
    const tdEinzelpreis = tr.appendChild(document.createElement("td"));
    const tdAnzahl = tr.appendChild(document.createElement("td"));
    const tdTotal = tr.appendChild(document.createElement("td"));
    const responseTotal = await fetch("/babashop/cart/products/total");
    const total = responseTotal.json();
    if (await total != 0) {
        tdTotal.innerHTML = await total;
    }
    table.appendChild(tr);
}
const loadTable1 = loadTable2;
export { loadTable1 as loadTable };
