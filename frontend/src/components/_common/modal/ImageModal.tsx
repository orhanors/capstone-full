import React, { ReactChild } from "react";
import { Modal } from "react-bootstrap";
import "./imageModal.scss";
interface Props {
	show: boolean;
	onHide(): void;
	children?: ReactChild;
	src: string;
}
function ImageModal(props: Props) {
	return (
		<Modal
			{...props}
			size='lg'
			className='image-modal'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			{/* <Modal.Header closeButton></Modal.Header> */}
			<Modal.Body>
				{" "}
				<img alt='modal-img' src={props.src} />{" "}
			</Modal.Body>
		</Modal>
	);
}

export default ImageModal;
