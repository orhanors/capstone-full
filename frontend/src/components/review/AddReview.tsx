import React, { useState } from "react";
import "./comment.scss";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import StarRatingComponent from "react-star-rating-component";
import { IAddReview } from "../../types/review.d";

interface AddCommentProps {
	disabled?: boolean;
	type: "product" | "article";
	value: IAddReview;
	onCommentChange(e: any): void;
	onSubmit(): void;
	onStarChange(star: number): void;
	onTitleChange?(e: any): void;
}
function AddReview(props: AddCommentProps) {
	const { data } = useSelector((store) => store.user);

	const onStarClick = (nextValue: any, prevValue: any, name: any) => {
		props.onStarChange(nextValue);
	};

	const showCommentRating = () => {
		return (
			<div className='rate ml-5 d-flex align-items-center'>
				<StarRatingComponent
					name='rate1'
					starCount={10}
					value={props.value.rate}
					onStarClick={onStarClick}
				/>
			</div>
		);
	};

	const showCommentInputArea = () => {
		return (
			<div>
				<div className='d-flex'>
					<img alt='user-avatar' src={data.image} className='mr-2' />
					<input
						maxLength={50}
						type='text'
						className='mb-3 w-50'
						placeholder='Title'
						value={props.value.title}
						onChange={props.onTitleChange}
					/>
				</div>
				<textarea
					disabled={props.disabled}
					placeholder={
						props.disabled
							? "You should buy this product to make a comment!"
							: "Comment"
					}
					name='add-comment'
					className={
						props.disabled
							? "add-new-comment ml-5 disabled"
							: "add-new-comment ml-5"
					}
					rows={3}
					value={props.value.comment}
					onChange={props.onCommentChange}
					maxLength={500}
				/>
			</div>
		);
	};

	const showSubmitBtn = () => {
		return (
			<div className='d-flex justify-content-end mt-2 mr-5 submit-btn'>
				<button
					title={
						props.disabled || props.value.comment.length < 2
							? "Write comment"
							: "Submit comment"
					}
					disabled={props.disabled}
					onClick={props.onSubmit}
					className={
						props.disabled || props.value.comment.length < 2
							? "disabled"
							: ""
					}>
					Submit
				</button>
			</div>
		);
	};

	return (
		<div className='add-comment-wrapper'>
			{props.type === "product" && showCommentRating()}
			{showCommentInputArea()}
			{showSubmitBtn()}
		</div>
	);
}

export default AddReview;
