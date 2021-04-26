import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import "./services/i18n";
import store from "./store/_setup/configuration/store";
ReactDOM.render(
	<React.StrictMode>
		<React.Suspense fallback='Loading...'>
			<Provider store={store}>
				<App />
			</Provider>
		</React.Suspense>
	</React.StrictMode>,
	document.getElementById("root")
);

/**
 * ---> React.Suspense :We’ve told React to suspend rendering of the <App> component until i18next has initialized,
 *                      which now depends on the first language file completing its download.
 */
