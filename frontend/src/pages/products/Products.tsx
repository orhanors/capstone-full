import React, { useEffect, useState } from "react";
import "./products.scss";

import ProductList from "../../components/productList/ProductList";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { Row, Col } from "react-bootstrap";
import ProductFilters from "../../components/productFilters/ProductFilters";
import Paginate from "../../components/_common/pagination/Paginate";

function Products() {
	const PRODUCTS_PER_PAGE = 4;
	const [activePage, setActivePage] = useState(1);

	const handlePageChange = (pageNumber: number) => {
		setActivePage(pageNumber);
	};
	const { productSidebar, products } = useSelector((store) => store);

	return (
		<div className='container my-5 products-page-wrapper'>
			<Row>
				{!productSidebar && (
					<Col md={3} className='mt-3 '>
						<ProductFilters />
					</Col>
				)}
				<Col md={9}>
					<div className='product-list'>
						<ProductList
							currentPage={activePage}
							productsPerPage={PRODUCTS_PER_PAGE}
						/>
					</div>
				</Col>
				<Col md={12}>
					<hr />
				</Col>
				<Col md={3}></Col>
				{products?.metadata && (
					<Col md={9}>
						<div className='d-flex justify-content-center mt-4'>
							<Paginate
								activePage={activePage}
								itemsCountPerPage={PRODUCTS_PER_PAGE}
								totalItemsCount={products.metadata!.count}
								onChange={handlePageChange}
							/>
						</div>
					</Col>
				)}
			</Row>
		</div>
	);
}

export default Products;
