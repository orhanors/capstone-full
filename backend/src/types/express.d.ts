declare namespace Express {
	interface Request {
		user?: import("../services/user").IUser;
	}
}
