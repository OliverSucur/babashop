async function productToCart(product) {
    await fetch("/babashop/cart", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("nigger");
}
document.getElementById("btn-cart").addEventListener("click", ()=>{
    location.href = "./lib/html/cart.html";
});
async function loadProducts2() {
    const responseProducts = await fetch("/babashop/products");
    const products = await responseProducts.json();
    const main = document.querySelector("main");
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
