import database from "../database/index.js";

import Cart from "./cart/cart.entity.js";

const cart = new Cart(database);

console.dir(cart, { depth: null });
