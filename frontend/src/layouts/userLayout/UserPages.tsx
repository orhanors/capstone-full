import React from "react";
import { Link } from "react-router-dom";
import { USER_PAGES } from "../../utils/userPages";
import { FaShoppingCart, FaEdit } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
interface Props {
	children?: React.ReactNode;
}
function UserPages({ children }: Props) {
	return (
		<div>
			{children ? children : ""}
			<Link to='editProfile'>
				<div className='user-page'>
					<span className='user-page-icon mr-2'>
						<FaEdit />
					</span>
					{USER_PAGES.edit}
				</div>
			</Link>

			<Link to='orders'>
				<div className='user-page'>
					<span className='user-page-icon mr-2'>
						<FaShoppingCart />
					</span>
					{USER_PAGES.orders}
				</div>
			</Link>

			<Link to='myReviews'>
				<div className='user-page'>
					<span className='user-page-icon mr-2'>
						<RiMessage2Fill />
					</span>
					{USER_PAGES.reviews}
				</div>
			</Link>
		</div>
	);
}

export default UserPages;
