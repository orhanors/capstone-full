export interface IUserStore {
	data: IUser;
	isLoggedIn: boolean;
	errorMessage: string;
	loading: boolean;
}

export interface IAddress {
	country: string;
	city: string;
	line1: string;
	line2: string;
	postalCode: number;
}
export interface IUser {
	_id?: string;
	role?: string;
	name: string;
	surname: string;
	phone?: string;
	image?: string;
	email: string;
	address?: IAddress;
	createdAt?: string;
	updatedAt?: string;
}
