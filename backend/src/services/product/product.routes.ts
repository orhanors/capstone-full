import { Router } from "express";
import { validateToken } from "../../middlewares/auth/validateToken";
import tryCatchWrapper from "../../utils/errors/tryCatchWrapper";
import { validateSeller } from "../../middlewares/auth/validateSeller";
import {
	addNewProduct,
	deleteProduct,
	removeImage,
	getSellerProducts,
	updateProduct,
	uploadProductImages,
	getProducts,
	getProductBySlug,
} from "./product.controller";
import cloudinaryMulter from "../../middlewares/cloudinary/cloudinaryMulter";
import {
	MAX_PRODUCT_IMAGE_SIZE,
	PRODUCT_CLOUDINARY_FOLDER,
	PRODUCT_IMAGE_KEY,
} from "../../settings/constants";

const productRouter = Router();

productRouter.get("/", validateToken, tryCatchWrapper(getProducts));
productRouter.get(
	"/slug/:slug",
	validateToken,
	tryCatchWrapper(getProductBySlug)
);
productRouter.post(
	"/",
	validateToken,
	validateSeller,
	tryCatchWrapper(addNewProduct)
);
productRouter.post(
	"/upload/images/:productId",
	validateToken,
	validateSeller,
	cloudinaryMulter.array(PRODUCT_IMAGE_KEY, MAX_PRODUCT_IMAGE_SIZE),
	tryCatchWrapper(uploadProductImages)
);

productRouter.delete(
	"/:productId",
	validateToken,
	validateSeller,
	tryCatchWrapper(deleteProduct)
);

productRouter.put(
	"/:productId",
	validateToken,
	validateSeller,
	tryCatchWrapper(updateProduct)
);

//Send { imageId:something } as body
productRouter.delete(
	`/:productId/remove/image/`,
	validateToken,
	validateSeller,
	tryCatchWrapper(removeImage)
);

productRouter.get(
	"/seller",
	validateToken,
	validateSeller,
	tryCatchWrapper(getSellerProducts)
);

export default productRouter;
