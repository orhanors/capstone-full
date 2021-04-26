import React from "react";

interface Props {
	color: string;
}
const FacebookLogo = (props: Props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='28.042'
			height='28.042'
			fill={props.color}
			viewBox='0 0 31.042 31.042'>
			<path
				d='M777.909,569.442a15.021,15.021,0,1,0,15.021,15.021A15.038,15.038,0,0,0,777.909,569.442Zm1.24,27.348v-7.973a.264.264,0,0,1,.263-.263h3.3v-2.945h-3.3a.263.263,0,0,1-.263-.263v-2.358a1.8,1.8,0,0,1,2.109-2.077h1.578v-2.7h-2.447c-2.65,0-4.3,1.694-4.3,4.429v2.711a.263.263,0,0,1-.264.263h-2.846v2.944h2.844a.264.264,0,0,1,.263.264V596.7a12.338,12.338,0,1,1,3.061.086Z'
				transform='translate(-762.388 -568.942)'
				stroke='rgba(0,0,0,0)'
				strokeWidth={1}
			/>
		</svg>
	);
};

export default FacebookLogo;
