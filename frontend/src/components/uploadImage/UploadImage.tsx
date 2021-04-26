import React, { FC, CSSProperties } from "react";
import { ConnectDropTarget, DropTargetMonitor } from "react-dnd";
import { DropTarget, DropTargetConnector } from "react-dnd";
import FileInput from "../_common/fileInput/FileInput";
import "./uploadImage.scss";
// const style: CSSProperties = {
// 	border: "1px solid gray",
// 	height: "15rem",
// 	width: "15rem",
// 	padding: "2rem",
// 	textAlign: "center",
// };

interface TargetBoxProps {
	accepts: string[];
	onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void;
	isOver: boolean;
	canDrop: boolean;
	connectDropTarget: ConnectDropTarget;
}
const UploadImage: FC<TargetBoxProps> = ({
	canDrop,
	isOver,
	connectDropTarget,
	children,
}) => {
	const isActive = canDrop && isOver;

	return connectDropTarget(
		<div
			className='product-img-dnd'
			style={{
				backgroundColor: `${isActive ? "gray" : ""}`,
				opacity: `${isActive ? "0.6" : "1"}`,
			}}>
			{!isActive && children}
		</div>
	);
};

export default DropTarget(
	(props: TargetBoxProps) => props.accepts,
	{
		drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
			if (props.onDrop) {
				props.onDrop(props, monitor);
			}
		},
	},
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	})
)(UploadImage);
