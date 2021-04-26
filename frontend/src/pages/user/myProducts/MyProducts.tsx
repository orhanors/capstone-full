import React, { useEffect, useState } from "react";
import UserLayout from "../../../layouts/userLayout/UserLayout";
import { backend } from "../../../utils/backend";
import { Col, Row } from "react-bootstrap";
import BasicLoader from "../../../loaders/spinner/BasicLoader";
import ProductCart from "../../../components/productCart/ProductCart";
import { IProduct } from "../../../types/product.d";
import { useSelector } from "../../../store/_helpers/useCustomSelector";
import { Nullish } from "@testing-library/react";
import { Link } from "react-router-dom";

function MyProducts() {
	const [products, setProducts] = useState<Array<IProduct> | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user } = useSelector((store) => store);
	const getSellerProducts = async () => {
		try {
			setLoading(true);
			const response = await backend({ url: "/products/seller" });
			setLoading(false);
			setProducts(response.data.reverse());
		} catch (error) {
			setError("Something went wrong! Please try again");
			setLoading(false);
		}
	};

	useEffect(() => {
		getSellerProducts();
	}, []);

	const getSuccessResult = () => {
		return (
			<Row>
				{products!?.length > 0 &&
					products!.map((product) => {
						return (
							<Col key={product._id} md={6} sm={12}>
								<ProductCart product={product} />
							</Col>
						);
					})}
			</Row>
		);
	};
	return (
		<UserLayout>
			<div className='ml-5'>
				{products!?.length !== 0 && (
					<h5 className='text-left text-gray'>
						{" "}
						<strong className='text-black'>
							{user.data.name + ","}
						</strong>{" "}
						see your product details and increase your selling!
					</h5>
				)}
				{products!?.length === 0 && !loading && (
					<h5 className='text-center mt-5 text-gray'>
						<strong className='text-black'>
							{user.data.name + ","}
						</strong>{" "}
						you don't have any products.{" "}
						<Link to='/addProduct'>
							{" "}
							<span className='text-green'>Start selling</span>
						</Link>
					</h5>
				)}

				{error && (
					<small className='text-center text-danger mt-5'>
						{error}
					</small>
				)}

				{loading && !products && (
					<span className='d-flex justify-content-center'>
						<BasicLoader animation='grow' variant='warning' />
					</span>
				)}

				{products!?.length > 0 && getSuccessResult()}
			</div>
		</UserLayout>
	);
}

export default MyProducts;
