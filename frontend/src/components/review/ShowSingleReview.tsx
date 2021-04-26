import React from "react";
import "./comment.scss";
import { IReview } from "../../types/review.d";
import StarRatingComponent from "react-star-rating-component";
import { useSelector } from "../../store/_helpers/useCustomSelector";

interface Props {
	review: IReview;
}
function ShowSingleReview(props: Props) {
	const { data } = useSelector((store) => store.user);
	const { review } = props;
	return (
		<div className='show-comment-wrapper d-flex my-3'>
			<div>
				<img
					alt={review.user!?.name + "avatar"}
					src={review.user!.image}
				/>
			</div>

			<div className='content ml-2 mt-2'>
				<p className='medium-title'>{review.title}</p>
				<StarRatingComponent
					name='rate1'
					starCount={10}
					value={review.rate}
				/>
				<p>{review.comment}</p>
			</div>
		</div>
	);
}

export default ShowSingleReview;
