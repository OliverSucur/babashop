export async function formHandle(){
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await fetch(`/babashop/cart/products/remove/all`, { method: "DELETE" });
        location.href = "./final.html";
    })
}
