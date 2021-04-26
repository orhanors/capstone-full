import React, { useEffect, useRef } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { unsetSearchSidebar } from "../../store/searchSidebar/searchSide";
import { useSelector } from "../../store/_helpers/useCustomSelector";

import "./searchsidebar.scss";
function SearchSidebar() {
	const sideWidth = "450px";
	const sideRef = useRef<HTMLDivElement>(null);
	const { searchSidebar } = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		if (searchSidebar) {
			sideRef.current!.style.width = sideWidth;
		}
	}, [searchSidebar]);
	return (
		<div ref={sideRef} id='mySidebar' className='search-sidebar'>
			<span
				className='closebtn'
				onClick={() => dispatch(unsetSearchSidebar())}>
				<TiArrowBackOutline />
			</span>
			<div>Test</div>
			<div>Test</div>
			<div>Test</div>
			<div>Test</div>
			<div>Test</div>
		</div>
	);
}

export default SearchSidebar;
