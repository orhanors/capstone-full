import { Router } from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import {
	addNewOrder,
	getSingleOrder,
	hasProductBoughtBefore,
} from "./order.controller";
import Order from "./order.schema";

const orderRouter = Router();

orderRouter.post("/new", validateToken, tryCatchWrapper(addNewOrder));

orderRouter.get("/:orderId", validateToken, tryCatchWrapper(getSingleOrder));

orderRouter.get(
	"/hasBoughtBefore/:productId",
	validateToken,
	tryCatchWrapper(hasProductBoughtBefore)
);
export default orderRouter;
