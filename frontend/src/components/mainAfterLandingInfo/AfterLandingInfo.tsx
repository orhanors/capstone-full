import React, { ReactNode, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./afterLanding.scss";
import product1 from "../../assets/imgs/home/mini-product1.webp";
import product2 from "../../assets/imgs/home/mini-product2.webp";
import product3 from "../../assets/imgs/home/mini-product3.webp";
import { Col, Row } from "react-bootstrap";

interface Info {
	img: string;
	title: string;
	info: string;
}
const introduceFeatures: Info[] = [
	{
		img: product1,
		title: "Accuracy",
		info: "Take advantage of highly optimized measurement products",
	},
	{
		img: product2,
		title: "Complete Protection",
		info: "Protect with highly trusted products",
	},
	{
		img: product3,
		title: "Personal Kits",
		info: "Prevent bacteria and virus,protect yourself",
	},
];

function InfoCard({ info }: { info: Info }) {
	return (
		<Col md={3} sm={12}>
			<div className='info-card d-flex flex-column'>
				<img alt={info.title} src={info.img} />
				<p className='medium-title title-black text-center mt-3'>
					{info.title}
				</p>
				<p className='text-gray text-center mt-2'>{info.info}</p>
			</div>
		</Col>
	);
}
function AfterLandingInfo({ height }: { height: string }) {
	return (
		<div style={{ height }} className='after-landing-info'>
			<h1 className='text-center text-green'>Take advantage of</h1>
			<p className='medium-title text-gray text-center'>
				Safety and high security
			</p>

			<Row className='justify-content-center mt-5'>
				{introduceFeatures.map((feature, index) => {
					return (
						<InfoCard key={feature.title + index} info={feature} />
					);
				})}
			</Row>
		</div>
	);
}

export default AfterLandingInfo;
