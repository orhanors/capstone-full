import React from "react";
interface Props {
	color: string;
}
function UserIcon(props: Props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20.424'
			height='23.84'
			fill={props.color}
			viewBox='0 0 20.424 23.84'>
			{" "}
			<g transform='translate(0.5 0.5)'>
				{" "}
				<path
					d='M929.072,538.39c-5.355,0-9.712,2.922-9.712,6.515s4.357,6.515,9.712,6.515,9.712-2.922,9.712-6.515S934.427,538.39,929.072,538.39Zm0,10.03c-3.78,0-6.712-1.89-6.712-3.515s2.932-3.515,6.712-3.515,6.712,1.889,6.712,3.515S932.852,548.42,929.072,548.42Z'
					transform='translate(-919.36 -528.58)'
					stroke='rgba(0,0,0,0)'
					strokeWidth={1}
				/>{" "}
				<path
					d='M928.965,537.207c2.728,0,4.95-1.936,4.95-4.314s-2.221-4.313-4.95-4.313-4.949,1.934-4.949,4.313S926.236,537.207,928.965,537.207Zm0-5.627c1.116,0,1.95.693,1.95,1.313s-.834,1.314-1.95,1.314-1.949-.694-1.949-1.314S927.85,531.58,928.965,531.58Z'
					transform='translate(-919.36 -528.58)'
					stroke='rgba(0,0,0,0)'
					strokeWidth={1}
				/>{" "}
			</g>{" "}
		</svg>
	);
}

export default UserIcon;
