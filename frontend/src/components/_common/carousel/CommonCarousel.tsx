import React, { CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./commonCarousel.scss";
interface CarouselProps {
	styledButton?: boolean;
	axis?: "horizontal" | "vertical";
	autoFocus?: boolean;
	autoPlay?: boolean;
	centerMode?: boolean;
	centerSlidePercentage?: number;
	children?: React.ReactChild[];
	className?: string;
	dynamicHeight?: boolean;
	emulateTouch?: boolean;
	infiniteLoop?: boolean;
	interval?: number;
	showArrows?: boolean;
	showStatus?: boolean;
	showIndicators?: boolean;
	showThumbs?: boolean;
}

const arrowStyles: CSSProperties = {
	position: "absolute",
	zIndex: 2,
	top: "calc(50% - 30px)",
	width: 50,
	height: 50,
	cursor: "pointer",

	fontSize: "2.5rem",
	backgroundColor: "transparent",
	color: "white",
};
function CommonCarousel(props: CarouselProps) {
	return (
		<div className='common-carousel-wrapper'>
			<Carousel
				showStatus={false}
				{...props}
				renderArrowPrev={(onClickHandler, hasPrev, label) =>
					hasPrev && (
						<button
							type='button'
							id='prevArrow'
							onClick={onClickHandler}
							style={{ ...arrowStyles, left: 15 }}>
							<span
								className={
									props.styledButton ? "styledButton" : ""
								}>
								&#8249;
							</span>
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
								<span
									className={
										props.styledButton ? "styledButton" : ""
									}>
									{" "}
									&#8250;
								</span>
							</button>
						</>
					)
				}>
				{props.children}
			</Carousel>
		</div>
	);
}

export default CommonCarousel;
