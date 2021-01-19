export async function formHandle(){
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await fetch(`/babashop/cart/products/remove/all`, { method: "DELETE" });
        location.href = "./final.html";
    })
    const div = document.querySelector("#cart-button");
    const buttonWebshop = document.createElement("button");

    const responseTotal = await fetch("/babashop/cart/products/total");
    const total:Promise<number> = responseTotal.json();

    buttonWebshop.id = "btn-cart";
    buttonWebshop.innerHTML = `<img src='./../../assets/svg/shopping-cart.svg'> CHF ${(await total).toFixed(2)}`;

    document.querySelector("#cart-button").appendChild(buttonWebshop);

    document.querySelector("#btn-cart").addEventListener("click", () => {
        location.href = "./cart.html";
    });
}
