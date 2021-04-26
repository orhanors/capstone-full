import React from "react";
import CommonCarousel from "../_common/carousel/CommonCarousel";
import "./mainProductsInfo.scss";
import ppe from "../../assets/imgs/productInfo/ppe.webp";
import medicine from "../../assets/imgs/productInfo/medicine.webp";
import topRated from "../../assets/imgs/productInfo/topRated.webp";
import devices from "../../assets/imgs/productInfo/devices.webp";
const categories = [
	{ img: devices, title: "Devices" },
	{ img: ppe, title: "PPE" },
	{ img: medicine, title: "Medicine" },
	{ img: topRated, title: "Top Rated" },
];
function MainProductsInfo() {
	return (
		<div className='main-products-info-wrapper container'>
			<h1 className='text-center text-green'>Choose Your Category</h1>
			<p className='medium-title title-gray text-center mt-3 mb-5 '>
				Personal and Professional Usage
			</p>

			<CommonCarousel
				showThumbs={false}
				centerSlidePercentage={50}
				showIndicators={false}
				centerMode
				styledButton
				autoPlay
				infiniteLoop>
				{categories.map((category) => {
					return (
						<div
							key={
								category.title + category.title.substring(0, 4)
							}
							className='product-info-carousel'>
							<img alt={category.title} src={category.img} />
							<button>{category.title}</button>
						</div>
					);
				})}
			</CommonCarousel>
		</div>
	);
}

export default MainProductsInfo;
