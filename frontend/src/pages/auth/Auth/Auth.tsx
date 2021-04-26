import React, { useRef } from "react";

import "../auth.scss";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
function Auth() {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<section className='auth-container'>
			<div ref={ref} className='container'>
				<Login
					change={() => {
						ref.current!.classList.toggle("active");
					}}
				/>
				<Signup
					change={() => {
						ref.current!.classList.toggle("active");
					}}
				/>
			</div>
		</section>
	);
}

export default Auth;
