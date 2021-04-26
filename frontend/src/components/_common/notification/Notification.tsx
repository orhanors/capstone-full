import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store/_helpers/useCustomSelector";
import { Link } from "react-router-dom";
import "../../../style/animations.scss";
import "./notification.scss";
import notification, {
	setNotification,
	unsetNotification,
} from "../../../store/notification/notification";

import { addProductToCart } from "../../../store/cart/shoppingCart";
import { FcApproval, FcInfo } from "react-icons/fc";
import { GrStatusWarning } from "react-icons/gr";

function Notification() {
	const successColor = "#51A351";
	const warningColor = "#202124";
	const failColor = "#ff4d4d";

	const GOOD_TIME = 3000;
	const WARNING_TIME = 8000;
	const BAD_TIME = 8000;
	const dispatch = useDispatch();
	const [notificationTime, setNotificationTime] = useState(GOOD_TIME);
	const notifyRef = useRef<HTMLDivElement>(null);

	const { show, message, link, behavior, undo, product, time } = useSelector(
		(store) => store.notification
	);

	const handleClose = () => {
		dispatch(unsetNotification());
	};
	const handleUndo = () => {
		dispatch(addProductToCart(product!?.id, product!?.price));
		dispatch(unsetNotification());
	};
	useEffect(() => {
		if (time && time > 0) {
			setNotificationTime(time!);
		} else if (behavior === "warning") {
			setNotificationTime(WARNING_TIME);
		} else if (behavior === "bad") {
			setNotificationTime(BAD_TIME);
		}
		if (show) {
			setTimeout(() => {
				dispatch(unsetNotification());
			}, notificationTime);
		}
	}, [show]);
	return (
		<>
			{show && (
				<div
					ref={notifyRef}
					className='notification-wrapper fadeInBottom'
					style={{
						backgroundColor: `${
							behavior === "good"
								? successColor
								: behavior === "warning"
								? warningColor
								: failColor
						}`,
						color: "white",
					}}>
					<div className='notify-content-wrapper d-flex align-items-center'>
						<div className='close' onClick={handleClose}>
							X
						</div>
						<div className='content mb-2'>
							{behavior === "good" && (
								<span className='approve-icon'>
									<FcApproval />
								</span>
							)}
							{behavior === "warning" && (
								<span className='info-icon mr-1'>
									<FcInfo />
								</span>
							)}

							{behavior === "bad" && (
								<span className='info-icon mr-1'>
									<GrStatusWarning />
								</span>
							)}
							{message}
							{link && (
								<span
									onClick={() =>
										dispatch(unsetNotification())
									}>
									<Link to={link.to} className='notify-link'>
										{" " + link.content}
									</Link>
								</span>
							)}

							{undo && (
								<button onClick={handleUndo} className='ml-2'>
									Undo
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Notification;
