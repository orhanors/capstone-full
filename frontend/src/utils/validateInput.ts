import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

export const validateInput = (
	requiredFields: object,
	allRequired?: boolean,
	email?: string
) => {
	const EMPTY_PHONE_PLACEHOLDER = "+9";
	const EMPTY_NUMBER_PLACEHOLDER = "0";

	for (let [field, value] of Object.entries(requiredFields)) {
		//field==="0" means empty number
		if (
			isEmpty(value) ||
			value === EMPTY_NUMBER_PLACEHOLDER ||
			value === EMPTY_PHONE_PLACEHOLDER
		) {
			if (allRequired) return "All fields are required!";
			return `Ooops! "${field}" field is required`;
		}
	}

	if (email) {
		if (isEmail(email)) {
			return false;
		} else {
			return "Invalid email format!";
		}
	}

	return false;
};
