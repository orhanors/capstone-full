import React from "react";
interface Props {
	color: string;
}
function SearchIcon(props: Props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='23.671'
			height='21.702'
			fill={props.color}
			viewBox='0 0 23.671 21.702'>
			{" "}
			<path
				d='M876.226,546.693l-4.964-4.964a9.058,9.058,0,1,0-1.825,2.464l4.645,4.645a1.516,1.516,0,0,0,2.144-2.144Zm-13.033-3.021a6.012,6.012,0,1,1,6.012-6.012,6.012,6.012,0,0,1-6.012,6.012Z'
				transform='translate(-853.59 -528.061)'
				stroke='rgba(0,0,0,0)'
				strokeWidth={1}
			/>{" "}
		</svg>
	);
}

export default SearchIcon;
