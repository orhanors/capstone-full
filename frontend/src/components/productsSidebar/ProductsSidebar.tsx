import React, { useEffect, useRef, memo, useState } from "react";
import { useDispatch } from "react-redux";
import {
	setProductSidebar,
	unsetProductSidebar,
} from "../../store/productSidebar/productSide";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { TiArrowBackOutline } from "react-icons/ti";
import { useDrop } from "react-dnd";
import "./prosidebar.scss";
import { ItemTypes } from "../../utils/items";
import {
	addProductToCart,
	getShoppingCart,
} from "../../store/cart/shoppingCart";
import { IProduct } from "../../types/product.d";
import CartItem from "../cartItem/CartItem";
import { IShoppingCart } from "../../types/cart";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
import { Link } from "react-router-dom";

function ProductsSidebar() {
	const dispatch = useDispatch();
	const { productSidebar, cart, user } = useSelector((state) => state);

	const { loading } = cart;
	const [isDropped, setIsDropped] = useState(false);
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item: IProduct, monitor) => {
			dispatch(addProductToCart(item._id, item.price));
		},
		collect: (monitor: any) => ({
			isOver: monitor.isOver(),
		}),
	});

	const sideWidth = "450px";
	const sideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (productSidebar) {
			sideRef.current!.style.width = sideWidth;
			dispatch(getShoppingCart());
		}
	}, [productSidebar]);

	useEffect(() => {
		if (isDropped) {
			dispatch(setProductSidebar());
			dispatch(getShoppingCart());
		}
		console.log("isDropped", isDropped);
	}, [isDropped]);

	const handlePayment = () => {
		dispatch(unsetProductSidebar());
	};
	const getProducts = () => {
		//console.log(cart?.data!.products);
		return (cart.data as IShoppingCart)?.products;
	};
	const showTotal = () => {
		return (
			<>
				<p
					className='text-center mt-3 total-wrapper'
					style={{ fontSize: "1rem" }}>
					{" "}
					<strong className='text-gray'>Total:</strong>{" "}
					<span className='total text-gray'>
						{"$" + cart.data?.total}
					</span>
				</p>
			</>
		);
	};
	const showCartDetails = () => {
		return (
			<>
				<span
					className='closebtn'
					onClick={() => dispatch(unsetProductSidebar())}>
					<TiArrowBackOutline />
				</span>
				<h3
					className='text-center text-green'
					style={{ fontWeight: "bold" }}>
					Shopping Cart
				</h3>

				{getProducts()?.length === 0 && !isOver && (
					<p
						className='d-flex align-items-center justify-content-center w-100 mt-5'
						style={{ fontSize: "1rem" }}>
						<strong>{user.data.name + ", "}</strong> your cart is
						empty!
					</p>
				)}
				{loading ? (
					<div className='d-flex justify-content-center align-items-center w-100 h-50'>
						<div>
							<HeartbeatLoader />
						</div>
					</div>
				) : (
					<div
						ref={drop}
						className='products mt-4'
						style={{
							backgroundColor: `${
								isOver ? "#56b0b89f" : "inherit"
							}`,
						}}>
						{getProducts()?.length > 0 &&
							getProducts().map((product) => {
								return (
									<CartItem
										//refresh={}
										key={product._id}
										productInfo={product}
									/>
								);
							})}
					</div>
				)}
			</>
		);
	};

	const showCartOptions = () => {
		return (
			<div className='cart-options d-flex justify-content-center mt-4'>
				<Link to='/products'>
					<button className='continue'>Continue Shopping</button>
				</Link>
				<Link to='/payment'>
					<button
						className='ml-4 pay'
						onClick={handlePayment}
						disabled={getProducts()?.length === 0 ? true : false}>
						Payment
					</button>
				</Link>
			</div>
		);
	};
	return (
		<div ref={sideRef} id='mySidebar' className='sidebar'>
			{showCartDetails()}
			{getProducts()?.length > 0 && !loading && showTotal()}
			{!loading && showCartOptions()}
		</div>
	);
}

export default memo(ProductsSidebar);
