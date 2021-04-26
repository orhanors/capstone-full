import React, { useEffect, useState } from "react";
import { backend } from "../../utils/backend";
import { RouteComponentProps } from "react-router";

import "./product.scss";
import BasicLoader from "../../loaders/spinner/BasicLoader";
import { GENERIC_ERROR_MSG } from "../../utils/constants";
import { IProduct } from "../../types/product.d";
import { Col, Row } from "react-bootstrap";
import CommonCarousel from "../../components/_common/carousel/CommonCarousel";
import { MdStars } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addMultipleProductToCart } from "../../store/cart/shoppingCart";
import { setProductSidebar } from "../../store/productSidebar/productSide";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
import AddReview from "../../components/review/AddReview";
import { IAddReview, IReview } from "../../types/review.d";
import ShowSingleReview from "../../components/review/ShowSingleReview";
interface MatchParams {
	slug: string;
}

interface ProductProps extends RouteComponentProps<MatchParams> {}

function Product(props: ProductProps) {
	const FAKE_DISCOUNT = 30;
	const dispatch = useDispatch();

	const initialReview: IAddReview = {
		comment: "",
		rate: 1,
		title: "",
		to: "product",
	};
	const [review, setReview] = useState<IAddReview>(initialReview);
	const [reviews, setReviews] = useState<IReview[] | []>([]);
	const [product, setProduct] = useState<IProduct | null>(null);
	const [ordered, setOrdered] = useState(false);
	const [qty, setQty] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [commentError, setCommentError] = useState("");
	const [commentLoading, setCommentLoading] = useState(false);
	useEffect(() => {
		if (product) {
			hasUserBoughtProduct();
			getReviews();
		}
	}, [product]);

	useEffect(() => {
		getProduct();
	}, []);

	useEffect(() => {
		getProduct();
	}, [props.match.params.slug]);

	const handleCommentChange = (e: any) => {
		setReview({ ...review, comment: e.target.value });
	};

	const handleRateChange = (star: number) => {
		setReview({ ...review, rate: star });
	};

	const submitComment = async () => {
		try {
			setCommentLoading(true);
			const response = await backend({
				url: `/review/product/${product?._id}`,
				method: "post",
				data: review,
			});

			if (response.status === 201) {
				setCommentLoading(false);
				setReview(initialReview);
				getProduct();
			} else {
				setCommentLoading(false);
				setCommentError(GENERIC_ERROR_MSG);
			}
		} catch (error) {
			setCommentLoading(false);
			setCommentError(GENERIC_ERROR_MSG);
		}
	};
	const getProduct = async () => {
		setLoading(true);
		try {
			const response = await backend({
				url: `/products/slug/${props.match.params.slug}`,
			});
			setProduct(response.data);
			setLoading(false);
		} catch (error) {
			setError(GENERIC_ERROR_MSG);
			setLoading(false);
		}
	};

	const getReviews = async () => {
		try {
			const response = await backend({
				url: `/review/product/${product?._id}`,
			});
			setReviews(response.data.reverse());
		} catch (error) {
			setError(GENERIC_ERROR_MSG);
		}
	};
	const hasUserBoughtProduct = async () => {
		const response = await backend(
			`/order/hasBoughtBefore/${product?._id}`
		);

		setOrdered(response.data);
	};
	const getFakeDiscount = (price: number) => {
		return Math.ceil(price + price * 0.3);
	};

	const handleAddMultipleProducts = () => {
		dispatch(addMultipleProductToCart(product?._id, product?.price, qty));
		dispatch(setProductSidebar());
	};

	const showLoader = () => {
		return <HeartbeatLoader />;
	};
	const showError = () => {
		return (
			<div className='d-flex justify-content-center mt-5'>
				<span className='text-danger'>{error}</span>
			</div>
		);
	};

	const showAddReviewSection = () => {
		return (
			<div>
				<h3 className='ml-5'>Reviews</h3>
				<hr />
				{commentError && (
					<small className='text-danger text-center'>
						{commentError}
					</small>
				)}
				{commentLoading && <HeartbeatLoader />}
				<AddReview
					disabled={!ordered}
					type='product'
					value={review}
					onStarChange={handleRateChange}
					onCommentChange={handleCommentChange}
					onTitleChange={(e) =>
						setReview({ ...review, title: e.target.value })
					}
					onSubmit={submitComment}
				/>
			</div>
		);
	};

	const showReviews = () => {
		return (
			<div className='show-reviews'>
				{(reviews as IReview[]).map((review: IReview) => {
					return (
						<ShowSingleReview review={review} key={review._id} />
					);
				})}
			</div>
		);
	};

	const showProductInfo = () => {
		return (
			<>
				{" "}
				{product && (
					<div className='product-info-wrapper'>
						<div className='product-head mt-3'>
							<p>{product.name}</p>
							<img
								alt={product.name}
								src={product.images[0].url}
							/>
						</div>

						<div className='product-details container'>
							<Row>
								<Col md={6} sm={12}>
									<CommonCarousel showIndicators={false}>
										{product.images.map((image) => {
											return (
												<div key={image._id}>
													<img
														alt={product.name}
														src={image.url}
													/>
												</div>
											);
										})}
									</CommonCarousel>
								</Col>
								<Col md={6} sm={12}>
									<div className='title text-green text-left'>
										<h3> {product.name}</h3>
									</div>
									<div className='d-flex justify-content-between'>
										<span>
											<MdStars />
										</span>
										<span className='fake-discount-value text-danger'>
											% {FAKE_DISCOUNT}
										</span>
									</div>
									<div className='text-green mt-3 d-flex justify-content-between align-items-center'>
										<div className='d-flex float-left'>
											<h6 className='fake-discount mr-4 mt-1 text-danger'>
												{" "}
												{"$" +
													getFakeDiscount(
														product.price
													)}
											</h6>
											<h4>{"$" + product.price}</h4>
										</div>
									</div>

									<p className='description text-gray mt-3'>
										{product.description}
									</p>

									<div className='d-flex cart-actions mt-4 '>
										<div className='d-flex qty-wrapper align-items-center'>
											<button
												className='mr-3'
												onClick={() => {
													qty > 1 && setQty(qty - 1);
												}}>
												-
											</button>
											<span>{qty}</span>
											<button
												className='ml-3'
												onClick={() => {
													qty <= product.quantity &&
														setQty(qty + 1);
												}}>
												+
											</button>
										</div>

										<button
											onClick={handleAddMultipleProducts}
											className='add-to-cart ml-5'>
											Add to Cart +
										</button>
									</div>

									<div className='product-subinfo mt-4'>
										<p className='text-gray mb-1'>
											{" "}
											<strong>Brand: </strong>{" "}
											{product.brand}
										</p>
										<p className='text-gray mb-1'>
											{" "}
											<strong>Category: </strong>{" "}
											{product.category}
										</p>
										<p className='text-gray mb-1'>
											<strong>Type: </strong>
											{product.type}
										</p>

										<p className='text-gray mb-1'>
											<strong>Stock: </strong>
											{product.quantity}
										</p>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				)}
			</>
		);
	};
	return (
		<div className='product-page-wrapper mb-5'>
			{loading && showLoader()}
			{error && showError()}
			{!error && !loading && showProductInfo()}

			<div className='review-section container'>
				{product && showAddReviewSection()}
				<hr />
				{product && showReviews()}
			</div>
		</div>
	);
}

export default Product;
