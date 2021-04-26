export const port = 3001;
export const mongodbUri = process.env.MONGODB_URI;

export const redirectUrl = process.env.REDIRECT_URL;

//CLOUDINARY
export const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

// JWT
export const jwtSecret = process.env.JWT_SECRET;

export const jwtRefreshSecret = process.env.JWT__REFRESH_SECRET;

// OAUTH
export const googleApiKey = process.env.GOOGLE_API_KEY;

export const googleApiSecret = process.env.GOOGLE_API_SECRET;

export const facebookApiKey = process.env.FACEBOOK_API_KEY;
export const facebookApiSecret = process.env.FACEBOOK_API_SECRET;

export const oauthGoogleRedirectUrl = process.env.OAUTH_GOOGLE_REDIRECT;

export const oauthFacebookRedirectUrl = process.env.OAUTH_FACEBOOK_REDIRECT;
