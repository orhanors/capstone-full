import "./inputArea.scss";
interface Props {
	onChange: (e: any) => void;
	type: "text" | "number" | "textarea" | "email" | "password";
	value: any;
	name: string;
	label?: string;
	required?: boolean;
}
function InputArea(props: Props) {
	return (
		<div className='input-area-container my-2'>
			<label htmlFor='test'>
				{props.label} {props.required ? "*" : ""}
			</label>
			{props.type === "textarea" ? (
				<textarea
					onChange={props.onChange}
					value={props.value}
					name={props.name}
					rows={6}
				/>
			) : (
				<input
					onChange={props.onChange}
					type={props.type}
					value={props.value}
					name={props.name}
				/>
			)}
		</div>
	);
}

export default InputArea;
