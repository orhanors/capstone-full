import React from "react";
import "./fileInput.scss";

interface Props {
	dnd?: boolean;
	text?: string;
	onChange: (e: any) => void;
}
function FileInput(props: Props) {
	return (
		<div className='file-input-wrapper'>
			<span>+ </span>
			{props.dnd && <small>{props.text}</small>}

			<input
				onChange={props.onChange}
				className='file-input'
				id='file-input-upload'
				type='file'
				accept='.gif, .jpg, .png .jpeg .webp'
			/>
		</div>
	);
}

export default FileInput;
