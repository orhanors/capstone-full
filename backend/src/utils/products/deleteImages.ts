import cloudinaryUpload from "cloudinary";
import { logger } from "../logger/winston";
import { IProduct } from "../../services/product/product.types.d";
import ApiError from "../errors/ApiError";

const cloudinary = cloudinaryUpload.v2;

/**
 * Takes single image public_id and removes it from cloudinary
 * @param imageId
 */
export const deleteSingleImg = (imageId: string): Promise<any> => {
	return new Promise((res, rej) => {
		cloudinary.uploader.destroy(imageId, (err, response) => {
			if (err) {
				logger.error(err);

				rej(err);
			} else {
				response.result === "ok"
					? res(true)
					: rej(new ApiError(404, "Image not found"));
			}
		});
	});
};

/**
 * Takes product and removes images which belong to that product
 * @param product
 */
export const deleteProductImages = (product: IProduct | null): Promise<any> => {
	return new Promise((res, rej) => {
		Promise.all(
			product!.images.map(async (img) => {
				await deleteSingleImg(img.id);
			})
		)
			.then((result) => {
				res(result);
			})
			.catch((e) => {
				rej(e);
			});
	});
};
