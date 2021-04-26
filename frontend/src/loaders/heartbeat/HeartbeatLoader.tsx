import React from "react";

function HeartbeatLoader() {
	return (
		<span className='d-flex justify-content-center mt-4'>
			<svg width={50} height={50} viewBox='0 0 100 100'>
				<path
					fill='#56b0b8'
					d='M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0 c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z'
				/>
				<animateTransform
					attributeName='transform'
					type='scale'
					values='1; 1.5; 1.25; 1.5; 1.5; 1;'
					dur='1s'
					repeatCount='indefinite'></animateTransform>
			</svg>
		</span>
	);
}

export default HeartbeatLoader;
