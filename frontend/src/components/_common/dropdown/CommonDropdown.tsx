import React, { ReactChild } from "react";
import "./dropdown.scss";

interface DropdownProps {
	children: ReactChild;
}
function CommonDropdown({ children }: DropdownProps) {
	return (
		<>
			<div className='dropdown-wrapper text-gray'>{children}</div>
		</>
	);
}

export default CommonDropdown;
