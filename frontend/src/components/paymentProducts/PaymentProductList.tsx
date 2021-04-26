import React, { useEffect } from "react";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { IShoppingCart } from "../../types/cart.d";
import CartItem from "../cartItem/CartItem";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "../../store/cart/shoppingCart";
import {
	setPaymentError,
	unsetPaymentError,
} from "../../store/paymentError/paymentError";
import { unsetNotification } from "../../store/notification/notification";
function PaymentProductList() {
	const { cart, user } = useSelector((store) => store);
	const dispatch = useDispatch();
	const { loading } = cart;
	const getProducts = () => {
		//console.log(cart?.data!.products);
		return (cart.data as IShoppingCart)?.products;
	};

	const isCartEmpty = () => {
		return (getProducts() && getProducts()?.length === 0) || !getProducts();
	};
	const generatePaymentError = () => {
		const error = {
			page: 2,
			message: `${user.data.name}, your cart is empty!`,
		};
		dispatch(setPaymentError(error));
	};

	useEffect(() => {
		dispatch(getShoppingCart());
	}, []);
	useEffect(() => {
		if (isCartEmpty()) {
			generatePaymentError();
		} else {
			dispatch(unsetPaymentError());
			dispatch(unsetNotification());
		}
	}, [cart.data]);
	return (
		<div>
			{loading && <HeartbeatLoader />}
			{!loading &&
				getProducts()?.length > 0 &&
				getProducts().map((product) => (
					<CartItem
						key={product._id + "payment"}
						productInfo={product}
					/>
				))}

			{isCartEmpty() && (
				<div className='w-100'>
					{" "}
					<h5 className='text-center mt-4'>
						{" "}
						<strong>{user.data.name}</strong>,your cart is empty
						<br />
						<br />
						<small className='text-center w-100'>
							{" "}
							<GoInfo /> Go to{" "}
							<Link to='/products'>
								<span
									onClick={() => {
										dispatch(unsetPaymentError());
										dispatch(unsetNotification());
									}}>
									products
								</span>
							</Link>{" "}
							page and add new products to your cart
						</small>
					</h5>
				</div>
			)}
		</div>
	);
}

export default PaymentProductList;
