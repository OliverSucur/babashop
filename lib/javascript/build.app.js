async function getAnzahl(product) {
    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts = await responseCartProducts.json();
    const anzahl = cartProducts.filter((e)=>e.id == product.id
    ).length;
    console.log(anzahl);
    return anzahl;
}
async function loadDetail2(product) {
    const main = document.querySelector("main");
    const img = document.createElement("img");
    img.src = product.imageName;
    const p = document.createElement("p");
    p.innerHTML = product.description;
    main.appendChild(img);
    main.appendChild(p);
}
const loadDetail1 = loadDetail2;
export { loadDetail1 as loadDetail };
async function formHandle2() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        await fetch(`/babashop/cart/products/remove/all`, {
            method: "DELETE"
        });
        location.href = "./final.html";
    });
}
const formHandle1 = formHandle2;
export { formHandle1 as formHandle };
async function loadTable2() {
    document.querySelector("#cart-back-button").innerHTML = "";
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
    const buttonBack = document.createElement("button");
    buttonBack.innerHTML = "Zurück";
    buttonBack.id = "btn-back";
    document.querySelector("#cart-back-button").appendChild(buttonBack);
    document.querySelector("#btn-back").addEventListener("click", ()=>{
        location.href = "./../../index.html";
    });
    const buttonOrder = document.createElement("button");
    buttonOrder.innerHTML = "Bestellen";
    buttonOrder.id = "btn-order";
    document.querySelector("#cart-back-button").appendChild(buttonOrder);
    document.querySelector("#btn-order").addEventListener("click", ()=>{
        location.href = "./order.html";
    });
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
        tdEinzelpreis.innerHTML = `CHF ${product.specialOffer.toFixed(2)}`;
        tdAnzahl.innerHTML = `<button id="btn-deleteAnzahl-${product.productName}">-</button>${anzahl}<button id="btn-addAnzahl-${product.productName}">+</button>`;
        tdTotal.innerHTML = `CHF ${(product.specialOffer * anzahl).toFixed(2)}`;
        table.appendChild(tr);
    }
    for (const product1 of filteredProducts){
        document.getElementById(`btn-deleteAnzahl-${product1.productName}`).addEventListener("click", async ()=>{
            await fetch(`/babashop/cart/products/remove${product1.id}`, {
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
        tdTotal.innerHTML = `CHF ${(await total).toFixed(2)}`;
    }
    table.appendChild(tr);
}
const loadTable1 = loadTable2;
export { loadTable1 as loadTable };
async function loadProducts2() {
    const responseProducts = await fetch("/babashop/products");
    const products = await responseProducts.json();
    const main = document.querySelector("main");
    main.innerHTML = "";
    document.getElementById("div-button").innerHTML = "";
    const responseTotal = await fetch("/babashop/cart/products/total");
    const total = responseTotal.json();
    const button = document.createElement("button");
    button.id = "btn-cart";
    button.innerHTML = `<img src='./assets/svg/shopping-cart.svg'> CHF ${(await total).toFixed(2)}`;
    const header = document.querySelector("header");
    document.getElementById("div-button").appendChild(button);
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
async function productToCart(product) {
    await fetch("/babashop/cart", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    loadProducts2();
}
export { loadProducts1 as loadProducts };
