import { Router } from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import {
	addProductToCart,
	decreaseProductQty,
	getUserCart,
	removeProductFromCart,
	addMultipleProducts,
} from "./cart.controller";

const cartRouter = Router();

//body -> {productId,price}
cartRouter.post("/add", validateToken, tryCatchWrapper(addProductToCart));

//body -> {productId,price,qty}
cartRouter.post(
	"/addMultiple",
	validateToken,
	tryCatchWrapper(addMultipleProducts)
);
cartRouter.post(
	"/decrease",
	validateToken,
	tryCatchWrapper(decreaseProductQty)
);

cartRouter.post(
	"/remove",
	validateToken,
	tryCatchWrapper(removeProductFromCart)
);

cartRouter.get("/user", validateToken, tryCatchWrapper(getUserCart));

export default cartRouter;
