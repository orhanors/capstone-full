import React from "react";
import { Link } from "react-router-dom";
import { SELLER_PAGES } from "../../utils/userPages";
import UserPages from "./UserPages";
import {
	RiShoppingBasketFill,
	RiAddCircleFill,
	RiArticleLine,
} from "react-icons/ri";

function SellerPages() {
	return (
		<div>
			<UserPages>
				<Link to='/addProduct'>
					<div className='user-page'>
						<span className='user-page-icon mr-2'>
							<RiAddCircleFill />
						</span>
						{SELLER_PAGES.addProduct}
					</div>
				</Link>

				<Link to='/addArticle'>
					<div className='user-page'>
						<span className='user-page-icon mr-2'>
							<RiArticleLine />
						</span>
						{SELLER_PAGES.addArticle}
					</div>
				</Link>

				<Link to='/myProducts'>
					<div className='user-page'>
						<span className='user-page-icon mr-2'>
							<RiShoppingBasketFill />
						</span>
						{SELLER_PAGES.myProducts}
					</div>
				</Link>
			</UserPages>
		</div>
	);
}

export default SellerPages;
