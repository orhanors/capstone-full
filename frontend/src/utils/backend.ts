import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
const { REACT_APP_BE_URL } = process.env;

const backend = axios.create({
	baseURL: REACT_APP_BE_URL,
	withCredentials: true,
});
const refreshAuthLogic = (failedRequest: any) =>
	backend({
		url: "/auth/refreshToken",
		withCredentials: true,
		method: "post",
	}).then((tokenRefreshResponse) => {
		return Promise.resolve();
	});
createAuthRefreshInterceptor(backend, refreshAuthLogic);

export { backend };
