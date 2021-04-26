import React from "react";

interface Props {
	color: string;
}
function InstagramLogo(props: Props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='28.034'
			height='28.034'
			fill={props.color}
			viewBox='0 0 31.034 31.034'>
			{" "}
			<g transform='translate(0.5 0.5)'>
				{" "}
				<path
					d='M827.218,569.433H813.761a8.3,8.3,0,0,0-8.289,8.289v13.457a8.3,8.3,0,0,0,8.289,8.288h13.457a8.3,8.3,0,0,0,8.288-8.288V577.722A8.3,8.3,0,0,0,827.218,569.433Zm5.624,21.746a5.63,5.63,0,0,1-5.624,5.623H813.761a5.63,5.63,0,0,1-5.624-5.623V577.722a5.631,5.631,0,0,1,5.624-5.624h13.457a5.631,5.631,0,0,1,5.624,5.624Z'
					transform='translate(-805.472 -569.433)'
					stroke='rgba(0,0,0,0)'
					strokeWidth={1}
				/>{" "}
				<path
					d='M818.745,574.967a7.739,7.739,0,1,0,7.739,7.739A7.739,7.739,0,0,0,818.745,574.967Zm0,12.812a5.075,5.075,0,1,1,5.074-5.074h0A5.08,5.08,0,0,1,818.745,587.779Z'
					transform='translate(-803.727 -567.688)'
					stroke='rgba(0,0,0,0)'
					strokeWidth={1}
				/>{" "}
				<path
					d='M823.488,573.249a1.953,1.953,0,1,0,1.382.572A1.954,1.954,0,0,0,823.488,573.249Z'
					transform='translate(-800.407 -568.23)'
					stroke='rgba(0,0,0,0)'
					strokeWidth={1}
				/>{" "}
			</g>{" "}
		</svg>
	);
}

export default InstagramLogo;
