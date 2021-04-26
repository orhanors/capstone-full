class ApiError extends Error {
	httpStatusCode: number;
	message: string;

	constructor(httpStatusCode = 500, message = "Internal Server Error") {
		super();
		this.httpStatusCode = httpStatusCode;
		this.message = message;
	}
}

export default ApiError;
