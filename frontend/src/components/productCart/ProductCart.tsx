import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/items";
import "./productCart.scss";
import { useDispatch } from "react-redux";
import { setProductSidebar } from "../../store/productSidebar/productSide";
import { IProduct } from "../../types/product";
import { GrFavorite } from "react-icons/gr"; //empty heart
import { FaEdit } from "react-icons/fa"; //filled heart
import { HiOutlineShoppingCart, HiLink, HiDotsVertical } from "react-icons/hi"; //cart
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgDetailsLess } from "react-icons/cg";
import "../../style/animations.scss";
import { Link, withRouter } from "react-router-dom";
import { addProductToCart } from "../../store/cart/shoppingCart";
import { setNotification } from "../../store/notification/notification";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { RouteComponentProps, useHistory } from "react-router";
import CommonDropdown from "../_common/dropdown/CommonDropdown";

interface Props extends RouteComponentProps {
	product: IProduct;
}

const ProductCart = (props: Props) => {
	const { product } = props;
	const [sellerInfo, setSellerInfo] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const { productSidebar } = useSelector((store) => store);
	const [hovered, setHovered] = useState(false);
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: product,
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		if (isDragging && !isSeller()) {
			dispatch(setProductSidebar());
		}
	}, [isDragging]);

	const generateSuccessNotification = () => {
		const notify = {
			message: "Successfully added to cart!",
			behavior: "good",
		};
		dispatch(setNotification(notify));
	};
	const handleAddToCart = () => {
		dispatch(addProductToCart(product._id, product.price));
		if (!productSidebar) {
			generateSuccessNotification();
		}
		//dispatch(setProductSidebar());
	};
	const isSeller = () => {
		return props.location.pathname === "/myProducts";
	};

	const isOrder = () => {
		return props.location.pathname.includes("orderReview");
	};
	return (
		<div
			onMouseOver={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				opacity: `${isDragging ? "0.5" : "1"}`,
				width: `${isOrder() && "12rem"}`,
				height: `${isOrder() && "17rem"}`,
			}}
			className='product-cart-container m-2'>
			<div className='img-wrapper'>
				<img
					onClick={() => {
						if (isOrder() || isSeller()) {
							history.push(`/products/${product.slug}`);
						}
					}}
					title={
						!isSeller()
							? "Drag and drop or add to cart"
							: `${product.name.substring(0, 10) + ".."}`
					}
					alt='product-img'
					src={
						hovered && product.images[1]
							? product.images[1].url
							: product.images[0].url
					}
					ref={drag}
				/>
				{!isDragging && !isSeller() && !isOrder() && (
					<div className='like-icon'>
						<span>
							<GrFavorite />{" "}
						</span>
					</div>
				)}

				{isSeller() && (
					<span
						className='like-icon'
						onMouseOver={() => setSellerInfo(true)}
						onMouseLeave={() => setSellerInfo(false)}>
						<HiDotsVertical />
						{sellerInfo && (
							<CommonDropdown>
								<ul>
									<li>
										<CgDetailsLess /> Details
									</li>
									<li>
										<FaEdit /> Edit
									</li>
									<li>
										<RiDeleteBin6Line /> Delete
									</li>
								</ul>
							</CommonDropdown>
						)}
					</span>
				)}
				{hovered && !isSeller() && !isOrder() && (
					<div className='icon-container fadeInBottom'>
						<span onClick={handleAddToCart}>
							{" "}
							<HiOutlineShoppingCart />
						</span>
						<Link to={`/products/${product.slug}`}>
							<span>
								{" "}
								<HiLink />{" "}
							</span>
						</Link>
					</div>
				)}
			</div>

			<div className='p-details'>
				<p className='text-black p-name'>{product.name}</p>
				<p className='text-gray p-name'>{"$" + product.price}</p>
			</div>
		</div>
	);
};

export default withRouter(ProductCart);
