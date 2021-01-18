import { TableColumn } from "../../models/tablecolumn.ts";

export async function loadTable(){
    const table = document.querySelector("table");

    const response = await fetch("/babashop/cart/tablecolumns");
    const tablecolumns: TableColumn[] = await response.json();

    for(const tablecolumn of tablecolumns){
        const tr  = document.createElement("tr");
        tr.innerHTML = `${tablecolumn.title}`;
        table.appendChild(tr);
    }
}