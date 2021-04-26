import React, { useState } from "react";
import "./payment.scss";
import {
	FaBookReader,
	FaShoppingCart,
	FaCreditCard,
	FaUserAlt,
} from "react-icons/fa";
import { FcNext } from "react-icons/fc";
import PaymentUserInfo from "../../components/paymentUserInfo/PaymentUserInfo";
import Stripe from "../../components/paymentStripe/Stripe";
import PaymentProductList from "../../components/paymentProducts/PaymentProductList";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { useDispatch } from "react-redux";
import { INotification } from "../../types/notification.d";
import { setNotification } from "../../store/notification/notification";

function Payment() {
	const [page, setPage] = useState(1);
	const { paymentError } = useSelector((store) => store);
	const dispatch = useDispatch();

	const generateNotification = (notification: INotification) => {
		dispatch(setNotification(notification));
	};
	const showProgress = () => {
		return (
			<div className='progress d-flex justify-content-around'>
				<span className={page >= 1 ? "active" : ""}>
					<FaBookReader />
				</span>
				<span className={page >= 2 ? "active" : ""}>
					<FaShoppingCart />
				</span>
				<span className={page >= 3 ? "active" : ""}>
					<FaCreditCard />
				</span>
			</div>
		);
	};
	const showPageButtons = () => {
		return (
			<>
				{" "}
				{page <= 3 && page > 1 && (
					<button
						onClick={() => {
							page > 1 && setPage(page - 1);
						}}>
						Go Back
					</button>
				)}
				{page < 3 && (
					<button
						onClick={() => {
							if (page <= 3) {
								if (
									paymentError.error &&
									page === paymentError.page
								) {
									const notification: INotification = {
										message: paymentError.message,
										behavior: "bad",
									};
									generateNotification(notification);
								} else {
									setPage(page + 1);
								}
							}
						}}>
						Next
					</button>
				)}{" "}
			</>
		);
	};
	return (
		<div className='container my-5 payment-page-wrapper h-100'>
			{showProgress()}

			{page === 1 && (
				<div className='mt-5 user-info'>
					<h4 className='text-center mb-3 text-gray'>
						{" "}
						<FcNext /> User Details
					</h4>
					<hr />
					<PaymentUserInfo />
				</div>
			)}
			{page === 2 && (
				<div className='mt-5 product-info'>
					<h4 className='text-center mb-3 text-gray'>
						{" "}
						<FcNext /> <FcNext /> Products
					</h4>
					<hr />
					<PaymentProductList />
				</div>
			)}
			{page === 3 && (
				<div className='mt-5 cart-info'>
					<h4 className='text-center mb-3 text-gray'>
						<FcNext /> <FcNext /> <FcNext /> Payment Method
					</h4>
					<hr />
					<Stripe />
				</div>
			)}

			<div className='d-flex justify-content-around btn-page'>
				{showPageButtons()}
			</div>
		</div>
	);
}

export default React.memo(Payment);
