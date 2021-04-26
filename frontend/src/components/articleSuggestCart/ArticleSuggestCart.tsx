import React, { useState, useEffect } from "react";
import { IArticle } from "../../types/article.d";
import "./articleSuggest.scss";
import { getFirstImg } from "../../utils/article";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
interface SuggestProps {
	article: IArticle;
}
function ArticleSuggestCart(props: SuggestProps) {
	const { article } = props;
	const [img, setImg] = useState<string | undefined>("");

	useEffect(() => {
		setImg(getFirstImg(article));
	}, []);
	return (
		<Tilt tiltAxis='y'>
			<Link to={`/blog/${article.slug}`}>
				<div className='article-suggest-wrapper mb-3 d-flex'>
					<img alt={article.title.substring(0, 10)} src={img} />
					<div className='details-wrapper pr-5'>
						<div className='details d-flex flex-column align-items-between ml-2'>
							<p className='text-black title'>
								{article.title.substring(0, 30)}
							</p>
							<div className='tags-wrapper'>
								<div className='tags'>
									{article.tags.map((tag) => {
										return (
											<small
												className='mr-1 text-gray'
												key={article._id + tag}>
												{"#" + tag}
											</small>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</Tilt>
	);
}

export default ArticleSuggestCart;
