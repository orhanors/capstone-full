import React, { Component, CSSProperties, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import landing1 from "../../assets/imgs/landing/landing1.webp";
import landing2 from "../../assets/imgs/landing/landing2.webp";
import landing3 from "../../assets/imgs/landing/landing3.webp";
import "../../style/animations.scss";
import "./carousel.scss";
const arrowStyles: CSSProperties = {
	position: "absolute",
	zIndex: 2,
	top: "calc(50% - 50px)",
	width: 50,
	height: 50,
	cursor: "pointer",
	border: "none",
	fontSize: "5rem",
	backgroundColor: "transparent",
	color: "white",
};
function MainCarousel() {
	return (
		<div className='main-carousel'>
			<Carousel
				showIndicators={false}
				showThumbs={false}
				showArrows={true}
				swipeable={true}
				showStatus={false}
				autoPlay={true}
				infiniteLoop={true}
				interval={5000} //milisecond
				renderArrowPrev={(onClickHandler, hasPrev, label) =>
					hasPrev && (
						<button
							type='button'
							id='prevArrow'
							onClick={onClickHandler}
							style={{ ...arrowStyles, left: 15 }}>
							&#8249;
						</button>
					)
				}
				renderArrowNext={(onClickHandler, hasNext, label) =>
					hasNext && (
						<>
							<button
								type='button'
								id='nextArrow'
								onClick={onClickHandler}
								style={{ ...arrowStyles, right: 15 }}>
								&#8250;
							</button>
						</>
					)
				}>
				<div className='content-wrapper'>
					<img alt='main' src={landing1} />
					<div className={"landing-item landing1"}>
						<p className='subtitle medium-title text-green'>
							Quality First
						</p>

						<p className='title big-title text-black'>
							{" "}
							Medical Safety Gears{" "}
						</p>
						<button>View Products</button>
					</div>
				</div>
				<div className=' content-wrapper'>
					<img alt='main' src={landing2} />
					<div className='landing-item landing2'>
						<p className='subtitle medium-title text-green'>
							Personal Health
						</p>

						<p className='title big-title text-black'>
							{" "}
							Prevent The Spread Of Disease
						</p>
						<button>Wear a Mask</button>
					</div>
				</div>
				<div className='landing-item content-wrapper'>
					<img alt='main' src={landing3} />
					<div className='landing3'>
						<p className='subtitle medium-title text-green'>
							Medical Devices
						</p>

						<p className='title big-title text-black'>
							{" "}
							For Medical Professional
						</p>
						<button>See Devices</button>
					</div>
				</div>
			</Carousel>
		</div>
	);
}

export default MainCarousel;
