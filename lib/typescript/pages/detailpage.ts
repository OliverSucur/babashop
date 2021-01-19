import { Product } from "./../../models/product.ts";

export async function loadDetail(product: Product){
    const main = document.querySelector("main");
    const img = document.createElement("img");
    img.src = product.imageName;
    const p = document.createElement("p");
    p.innerHTML = product.description;
    main.appendChild(img);
    main.appendChild(p);
}