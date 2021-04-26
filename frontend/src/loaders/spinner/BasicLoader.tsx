import React from "react";
import { Spinner } from "react-bootstrap";

interface Props {
	size?: "sm" | undefined;
	animation?: "border" | "grow";
	variant?:
		| "primary"
		| "secondary"
		| "success"
		| "danger"
		| "warning"
		| "info";
}
function BasicLoader(props: Props) {
	const { size, animation, variant } = props;
	return (
		<Spinner
			animation={animation || "border"}
			variant={variant || "secondary"}
			role='status'
			size={size}>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
}

export default BasicLoader;
