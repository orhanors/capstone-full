export const generateUserFromFacebook = (profile: any) => {
	const name = profile.name.givenName;
	const surname = profile.name.familyName;
	const email = profile.emails[0].value;
	const newUser = {
		name,
		surname,
		facebookId: profile.id,
		email,
		image: profile.photos[0].value,
	};

	return newUser;
};

export const generateUserFromGoogle = (profile: any) => {
	const newUser = {
		googleId: profile.id,
		name: profile.name.givenName,
		surname: profile.name.familyName,
		email: profile.emails[0].value,
		image: profile.photos[0].value,
	};
	return newUser;
};
