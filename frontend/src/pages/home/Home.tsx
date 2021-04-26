import React, { Suspense } from "react";
import AfterLandingInfo from "../../components/mainAfterLandingInfo/AfterLandingInfo";

import Landing from "../../components/landing/Landing";
import MainParalllax from "../../components/mainParallax/MainParalllax";

import "./home.scss";
import MainProductsInfo from "../../components/mainProductsInfo/MainProductsInfo";
function Home() {
	return (
		<div>
			<Landing />
			<AfterLandingInfo height='90vh' />
			<MainProductsInfo />
		</div>
	);
}

export default Home;
