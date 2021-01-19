/// <reference lib="dom" />

import { Product } from "./../../models/product.ts";

export async function loadProducts() {
    const responseProducts = await fetch("/babashop/products");
    const products: Product[] = await responseProducts.json();
    const main = document.querySelector("main");

    const button = document.createElement("button");
    button.id = "btn-cart";
    button.innerHTML = "Warenkorb";

    const header = document.querySelector("header");
    header.appendChild(button);
    
    document.querySelector("#btn-cart").addEventListener("click", () => {
        location.href = "./lib/html/cart.html";
    })

    for(const product of products){
        const div = document.createElement("div");
        div.setAttribute("data-id", product.id);
        div.innerHTML = `
            <div class="card">
            <img src="./../assets/img/${product.imageName}" alt="Avatar" style="width:100%">
            <div class="container">
                <h4>${product.productName}</h4>
                <p>${product.specialOffer} ${product.normalPrice}</p>
                <button class="btn-addToCart" id="btn-id-${product.id}">Add to cart</button>
            </div>
            </div>
        `;

        div.querySelector(".btn-addToCart").addEventListener("click", () => productToCart(product))
        main.appendChild(div);
    }  
}

async function productToCart(product: Product){
    await fetch(
        "/babashop/cart",
        {
            method: "POST",
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        }
    )
}

