import React from "react";
interface Props {
	color: string;
}
function CartIcon(props: Props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='21.476'
			height='24.229'
			fill={props.color}
			viewBox='0 0 21.476 24.229'>
			{" "}
			<path
				d='M1000.139,536.778h-3.618v-2.551a6.153,6.153,0,0,0-12.306.007v2.544h-3.547a.509.509,0,0,0-.5.509v9.049a5.054,5.054,0,0,0,5.048,5.049h10.38a5.054,5.054,0,0,0,5.048-5.049v-9.049A.509.509,0,0,0,1000.139,536.778Zm-12.879-2.543a3.11,3.11,0,0,1,3.107-3.1h.005a3.112,3.112,0,0,1,3.1,3.1v2.544H987.26Zm10.38,12.1a2.056,2.056,0,0,1-2.048,2.052H985.216a2.056,2.056,0,0,1-2.052-2.049v-6.558H997.64Z'
				transform='translate(-979.664 -527.656)'
				stroke='rgba(0,0,0,0)'
				strokeWidth={1}
			/>{" "}
		</svg>
	);
}

export default CartIcon;
