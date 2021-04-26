import React, { useState } from "react";
import Pagination from "react-js-pagination";

import "./paginate.scss";
interface PaginateProps {
	activePage: number;
	itemsCountPerPage: number;
	totalItemsCount: number;

	onChange(pageNumber: number): void;
}
function Paginate(props: PaginateProps) {
	const PAGE_RANGE_DISPLAYED = 5;
	const {
		activePage,
		itemsCountPerPage,
		totalItemsCount,

		onChange,
	} = props;

	return (
		<div className='paginate-wrapper'>
			{" "}
			<Pagination
				activePage={activePage}
				itemsCountPerPage={itemsCountPerPage}
				totalItemsCount={totalItemsCount}
				pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
				onChange={onChange}
			/>
		</div>
	);
}

export default Paginate;
