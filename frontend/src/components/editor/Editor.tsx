import React from "react";
import ReactQuill, { Quill } from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

import "./editor.scss";
interface EditorProps {
	html: any;
	handleChange(value: any): void;
}

export const Editor = (props: EditorProps) => {
	return (
		<div className='text-editor mt-2'>
			<EditorToolbar />
			<ReactQuill
				theme='snow'
				value={props.html}
				onChange={props.handleChange}
				placeholder={"Write something awesome..."}
				modules={modules}
				formats={formats}
			/>
		</div>
	);
};

export default Editor;
