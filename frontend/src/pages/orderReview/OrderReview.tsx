import React, { useState, useEffect } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import OrderCart from "../../components/orderCart/OrderCart";
import { FcApproval } from "react-icons/fc";
import "./orderReview.scss";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
import { backend } from "../../utils/backend";
import { RouteComponentProps } from "react-router";
import { IOrder } from "../../types/order";
interface MatchParams {
	orderId: string;
}
interface OrderProps extends RouteComponentProps<MatchParams> {}
function OrderReview(props: OrderProps) {
	const CONFETTI_DURATION = 4000;
	const [isExploding, setIsExploding] = useState(true);
	const [order, setOrder] = useState<IOrder | null>(null);
	const { user } = useSelector((store) => store);
	const { loading } = user;

	const getOrderDetails = async () => {
		try {
			const response = await backend({
				url: `/order/${props.match.params.orderId}`,
			});

			if (response.status === 200) {
				setOrder(response.data);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getOrderDetails();
	}, []);
	useEffect(() => {
		if (isExploding) {
			setTimeout(() => {
				setIsExploding(false);
			}, CONFETTI_DURATION);
		}
	}, [isExploding]);

	const showConfetti = () => {
		return (
			<ConfettiExplosion
				duration={CONFETTI_DURATION}
				floorHeight={1200}
				particleCount={300}
			/>
		);
	};

	const showSuccessMessage = () => {
		return (
			<div className='d-flex flex-column align-items-center success'>
				<div className='icon'>
					{" "}
					<FcApproval />
				</div>

				<div>
					<h4>
						<strong>{user.data.name + ", "}</strong>your order has
						been successfully received!
					</h4>
				</div>
			</div>
		);
	};

	const showOrderDetails = () => {
		return <OrderCart order={order!} />;
	};

	return (
		<div className='w-100 h-100 order-review-wrapper container my-5'>
			{loading && <HeartbeatLoader />}
			{!loading && (
				<div>
					{showSuccessMessage()}
					<hr />
					{isExploding && (
						<div className='d-flex justify-content-center align-items-center confetti'>
							{showConfetti()}
						</div>
					)}

					{order && showOrderDetails()}
				</div>
			)}
		</div>
	);
}

export default OrderReview;
