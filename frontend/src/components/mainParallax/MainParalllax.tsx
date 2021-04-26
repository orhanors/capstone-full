import React, { CSSProperties } from "react";
import { Parallax, Background } from "react-parallax";

const insideStyles: CSSProperties = {
	background: "white",
	padding: 20,
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
};
function MainParalllax() {
	return (
		<div>
			<Parallax
				bgImage='https://www.medikalakademi.com.tr/wp-content/uploads/2018/01/ozel-medical-park-samsun-hastanesi.jpg'
				blur={{ min: -1, max: 3 }}>
				<div style={{ height: 500 }}>
					<div style={insideStyles}>Dynamic Blur</div>
				</div>
			</Parallax>
			<h2>| | |</h2>
			<Parallax
				bgImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSquaOpL7GQTZgZv-tmdBwhQjzMUQ_-LMQPGQ&usqp=CAU'
				strength={-100}>
				<div style={{ height: 500 }}>
					<div style={insideStyles}>Reverse direction</div>
				</div>
			</Parallax>
			<h2>| | |</h2>
			<Parallax
				bgImage='https://lh3.googleusercontent.com/proxy/_aqakJx4Ge5P7SgUw6sqJNssvBTRX7_PFngFvAnsTV-XVhtJV-3pVHv0TB4num2LIPq5dxiE8HmsXN0A8tFhWZupNPXxRZzJr7N_Asyv9g'
				strength={200}
				renderLayer={(percentage) => (
					<div>
						<div
							style={{
								position: "absolute",
								background: `rgba(255, 125, 0, ${
									percentage * 1
								})`,
								left: "50%",
								top: "50%",
								borderRadius: "50%",
								transform: "translate(-50%,-50%)",
								width: percentage * 500,
								height: percentage * 500,
							}}
						/>
					</div>
				)}>
				<div style={{ height: 500 }}>
					<div style={insideStyles}>renderProp</div>
				</div>
			</Parallax>
		</div>
	);
}

export default MainParalllax;
