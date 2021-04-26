import React from "react";
import "./usersidebar.scss";
import { useSelector } from "../../store/_helpers/useCustomSelector";

import { USER_ROLES } from "../../utils/constants";
import UserPages from "./UserPages";
import SellerPages from "./SellerPages";

interface Props {
	children?: React.ReactNode;
	to?: string;
}
function UserLayout({ children, to }: Props) {
	const { user } = useSelector((store) => store);

	return (
		<div className='user-sidebar-container container d-md-flex mt-4'>
			<div className='user-sidebar mt-2'>
				{user.data.role === USER_ROLES.seller && <SellerPages />}

				{user.data.role === USER_ROLES.user && <UserPages />}
			</div>
			<div className='content'>{children}</div>
		</div>
	);
}

export default UserLayout;
