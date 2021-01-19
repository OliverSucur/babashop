import { Application, Context, Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session/mod.ts";
import { v4 } from "https://deno.land/std@0.80.0/uuid/mod.ts";

import { Product } from "./../models/product.ts";
import { TableColumn } from "./../models/tablecolumn.ts";

const app = new Application();

const products: Product[] = [
    {
        "id": "001",
        "productName": "Nektarinen gelb",
        "specialOffer": 3.6,
        "normalPrice": 5.2,
        "imageName": "nektarinen.jpg",
        "description": "Herkunft: Spanien"
    },
    {
        "id": "002",
        "productName": "Rispentomaten",
        "specialOffer": 2.65,
        "normalPrice": 3.1,
        "imageName": "tomaten.jpg",
        "description": "Tomaten verfügen über einen hohen Gehalt an Vitamin C sowie Zucker und Mineralstoffen."
    },
    {
        "id": "003",
        "productName": "Kalbs-Bratwürste",
        "specialOffer": 8.25,
        "normalPrice": 16.5,
        "imageName": "kalbsbratwuerste.jpg",
        "description": "Terra Suisse Kalbs-Bratwurst 3x2 Stück"
    },
    {
        "id": "004",
        "productName": "Appenzeller Classic",
        "specialOffer": 2.7,
        "normalPrice": 3.45,
        "imageName": "appenzeller.jpg",
        "description": "Schweizer Halbhartkäse und  vollfett. aus Rohmilch"
    },
    {
        "id": "005",
        "productName": "Eier",
        "specialOffer": 4.5,
        "normalPrice": 5.4,
        "imageName": "eier.jpg",
        "description": "9 Schweizer Eier aus Frilandhaltung"
    },
    {
        "id": "006",
        "productName": "Krustenkranz",
        "specialOffer": 2,
        "normalPrice": 2.3,
        "imageName": "krustenkranz.jpg",
        "description": "Terra Suisse"
    },
    {
        "id": "007",
        "productName": "Magunm Almond",
        "specialOffer": 7.9,
        "normalPrice": 9.9,
        "imageName": "vanille_glace.jpg",
        "description": "Vanilleglace und Milchschokolade mit Mandeln"
    },
    {
        "id": "008",
        "productName": "Iced Green Tea",
        "specialOffer": 7.5,
        "normalPrice": 10.8,
        "imageName": "icedtea.jpg",
        "description": "AriZona Green Tea - Grünteegrtränk"
    },
    {
        "id": "009",
        "productName": "Senf",
        "specialOffer": 2.7,
        "normalPrice": 3.4,
        "imageName": "senf.jpg",
        "description": "Senf mild"
    },
    {
        "id": "010",
        "productName": "Olivenöl",
        "specialOffer": 14.35,
        "normalPrice": 17.95,
        "imageName": "olivenoel.jpg",
        "description": "Bertolli Olivenöl extra vergine originale"
    }
];

const cart: Product[] = [];
const tablecolumns: TableColumn[] = [
    {id: v4.generate(), title: "Produkt"},
    {id: v4.generate(), title: "Einzelpreis"},
    {id: v4.generate(), title: "Anzahl"},
    {id: v4.generate(), title: "Total"},
];

const session = new Session({
    framework: "oak",
    store: "memory",
});

await session.init();

export const userSession = session.use()(session);

const router = new Router();

router
    .get("/babashop/cart/tablecolumns", (ctx) => {
        ctx.response.body = tablecolumns;
        ctx.response.status = 200;
    })
    .get("/babashop/products", (ctx) => {
        ctx.response.body = products;
    })
    .get("/babashop/products:id", (ctx) => {
        ctx.response.body = products.find(e => e.id == ctx.params.id);
    })
    .post("/babashop/cart", async (ctx) => {
        let addedProduct = await ctx.request.body({ type: "json" }).value;
        cart.push(addedProduct);
        ctx.response.body = 200;
    })
    .get("/babashop/cart/products", async (ctx) => {
        ctx.response.body = cart;
    });
    

export const api = router.routes();