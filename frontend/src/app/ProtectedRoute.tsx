import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthUser } from "../utils/auth";

import { useDispatch } from "react-redux";
import { getUserProfile } from "../store/user/user";

const ProtectedRoute = ({ component, ...rest }: any) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthUser()) {
			if (rest.path === "/") {
				dispatch(getUserProfile());
			}
		}
	}, []);
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthUser() || rest.path === "/" ? (
					React.createElement(component, props)
				) : (
					<Redirect {...rest} to='/login' />
				)
			}
		/>
	);
};

export default ProtectedRoute;
