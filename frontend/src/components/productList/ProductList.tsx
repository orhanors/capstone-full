import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { IProduct } from "../../types/product";
import ProductCart from "../productCart/ProductCart";
import { getMainProducts } from "../../store/products/products";
import { Row, Col, Container } from "react-bootstrap";
import BasicLoader from "../../loaders/spinner/BasicLoader";
import { GENERIC_ERROR_MSG } from "../../utils/constants";

interface ProductListProps {
	currentPage: number;
	productsPerPage: number;
}
function ProductList(props: ProductListProps) {
	const dispatch = useDispatch();
	const { products, productSidebar } = useSelector((store) => store);

	const { data, loading, errorMessage } = products;
	useEffect(() => {
		dispatch(getMainProducts(props.currentPage, props.productsPerPage));
	}, [props.currentPage]);

	const getLoading = () => {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<BasicLoader animation='grow' />
			</div>
		);
	};

	const getSuccessResult = () => {
		return (
			<Row>
				{data.length > 0 &&
					(data as IProduct[]).map((product) => {
						return (
							<Col
								key={product._id}
								md={productSidebar ? 6 : 6}
								sm={12}>
								<ProductCart product={product} />
							</Col>
						);
					})}
			</Row>
		);
	};
	return (
		<Container className='test'>
			{loading && getLoading()}
			{!loading && !errorMessage && getSuccessResult()}
			{errorMessage && (
				<div className='text-center'>{GENERIC_ERROR_MSG}</div>
			)}
		</Container>
	);
}

export default ProductList;
