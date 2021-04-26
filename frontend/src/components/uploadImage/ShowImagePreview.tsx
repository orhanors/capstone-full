import React, { useState } from "react";
import ImageModal from "../_common/modal/ImageModal";
interface Props {
	file: File[];
	imgClassName: string;
	deleteImage?: (e: any) => void;
	id?: string;
}
const ShowImagePreview: React.FC<Props> = (props: Props) => {
	const { file, imgClassName } = props;
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<ImageModal
				show={showModal}
				onHide={() => setShowModal(false)}
				src={URL.createObjectURL(file[0])}
			/>
			<img
				onClick={() => setShowModal(true)}
				className={imgClassName}
				alt='product-preview'
				src={URL.createObjectURL(file[0])}
			/>

			<span
				id={props.id}
				onClick={props.deleteImage}
				className='delete-img'>
				X
			</span>
		</>
	);
};

export default ShowImagePreview;
