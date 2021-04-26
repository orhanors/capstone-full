import { Document } from "mongoose";

export function populateInstance<T extends Document>(
	instance: T,
	field: string
): Promise<T> {
	return new Promise((res, rej) => {
		instance.populate(field, (err, response) => {
			if (err) {
				rej(err);
			} else {
				res(response);
			}
		});
	});
}
