import React from "react";
import PaymentUserInfo from "../paymentUserInfo/PaymentUserInfo";
import "./orderCart.scss";
import { IOrder } from "../../types/order";
import { Row, Col } from "react-bootstrap";
import ProductCart from "../productCart/ProductCart";

interface OrderProps {
	order?: IOrder;
}
function OrderCart(props: OrderProps) {
	const { order } = props;
	return (
		<div className='order-cart-wrapper'>
			<Row>
				<Col md={4}>
					<PaymentUserInfo />
				</Col>

				<Col md={1}>
					<div className='vl'></div>
				</Col>
				<Col md={7}>
					<Row className='order-products'>
						{order?.products.map((data) => (
							<ProductCart
								product={data.product}
								key={data._id + "order"}
							/>
						))}
					</Row>
				</Col>
			</Row>
		</div>
	);
}

export default OrderCart;
