import React, { useCallback, useEffect } from "react";
import "./cartItem.scss";
import { IProduct } from "../../types/product.d";
import { ICartItem } from "../../types/cart";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	addProductToCart,
	decreaseItemFromCart,
	removeItemFromCart,
} from "../../store/cart/shoppingCart";
import { setNotification } from "../../store/notification/notification";

interface Props {
	productInfo: ICartItem;
}
function CartItem(props: Props) {
	const { productInfo } = props;
	const { product, qty } = productInfo;
	const dispatch = useDispatch();
	const history = useHistory();

	const getWarningNotification = () => {
		const notify = {
			message: "You removed item!",
			behavior: "warning",
			undo: true,
			product: { id: product._id, price: product.price },
		};
		dispatch(setNotification(notify));
	};
	const handleAddItem = () => {
		dispatch(addProductToCart(product._id, product.price));
	};

	const handleDecreaseItem = () => {
		dispatch(decreaseItemFromCart(product._id, product.price));
	};

	const handleRemoveItem = () => {
		dispatch(removeItemFromCart(product._id, product.price, qty));
		getWarningNotification();
	};
	return (
		<div className='cart-item-wrapper my-4 mx-4 d-flex justify-content-between'>
			{/* <Link to={`/products/${product.slug}`}> */}
			<div
				className='item-details d-flex flex-row'
				onClick={() => history.push(`/products/${product.slug}`)}>
				{product?.images?.length > 0 && (
					<img
						className='cart-item-img'
						alt={product?.name}
						src={product?.images[0].url}
					/>
				)}

				<div className='d-flex flex-column mt-2 ml-1'>
					<p className='title'>
						{product?.name?.length <= 7
							? product?.name
							: product?.name.substring(0, 7) + "..."}
					</p>
					<p className='price'>{"$" + product.price}</p>
				</div>
			</div>
			{/* </Link> */}

			<div className='item-qty d-flex flex-column'>
				<span onClick={handleAddItem}>
					{" "}
					<IoIosArrowUp />{" "}
				</span>
				<p className='qty text-center'>{qty}</p>
				<span onClick={handleDecreaseItem}>
					{" "}
					<IoIosArrowDown />{" "}
				</span>
			</div>
			<div className='d-flex align-items-center'>
				<p>{"$" + qty * product.price}</p>
			</div>
			<div
				onClick={handleRemoveItem}
				className='d-flex justify-content-center align-items-center'>
				<AiOutlineCloseCircle />
			</div>
		</div>
	);
}

export default CartItem;
