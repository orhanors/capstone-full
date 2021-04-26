import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./styles.scss";
interface CheckboxProps {
	name: string;
	label: string;
}
function Checkbox(props: CheckboxProps) {
	const { name, label } = props;
	const valueRef = useRef<HTMLLabelElement>(null);
	const [isChecked, setIsChecked] = useState(false);

	const toggleCheck = (e: any) => {
		setIsChecked(() => !isChecked);
	};

	useEffect(() => {
		if (isChecked) {
			console.log(isChecked);
			console.log(valueRef.current?.innerText);
		}
	}, [isChecked]);
	return (
		<div>
			<input
				type='checkbox'
				className='custom-radio'
				name={name}
				id={name}
				checked={isChecked}
				onChange={toggleCheck}
			/>
			<label htmlFor={name}>
				<span ref={valueRef}>{label}</span>
			</label>
		</div>
	);
}

export default Checkbox;
