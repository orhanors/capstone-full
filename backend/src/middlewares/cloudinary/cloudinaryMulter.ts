import cloudinaryUpload from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { PRODUCT_CLOUDINARY_FOLDER } from "../../settings/constants";
const {
	cloudinaryCloudName,
	cloudinaryApiSecret,
	cloudinaryApiKey,
} = require("../../config/keys");

const cloudinary = cloudinaryUpload.v2;

cloudinary.config({
	cloud_name: cloudinaryCloudName,
	api_key: cloudinaryApiKey,
	api_secret: cloudinaryApiSecret,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: PRODUCT_CLOUDINARY_FOLDER,
	},
});

const cloudinaryMulter = multer({ storage: storage });

export default cloudinaryMulter;

/**
 * USAGE
 * ------
 *
 * import cloudinaryMulter and use as a middleware
 */
