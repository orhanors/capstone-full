import React from "react";
import MainCarousel from "../mainCarousel/MainCarousel";

import "./landing.scss";

function Landing() {
	return (
		<div className='landing-wrapper container mt-4'>
			<MainCarousel />
		</div>
	);
}

export default Landing;
