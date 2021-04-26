import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import "./articleCart.scss";
import { IArticle } from "../../types/article.d";
import { Link } from "react-router-dom";
import { getFirstImg } from "../../utils/article";

interface ArticleProps {
	article: IArticle;
}
function ArticleCart(props: ArticleProps) {
	const TITLE_CUT_LENGTH = 40;
	const { article } = props;
	const [headerImg, setHeaderImg] = useState<string | undefined>("");
	const [slug, setSlug] = useState("");

	useEffect(() => {
		setHeaderImg(getFirstImg(article));
	});
	return (
		<Tilt tiltAxis='y'>
			<div className='article-cart-container my-2'>
				<Link to={`/blog/${article.slug}`}>
					<img alt='product' src={headerImg} />
				</Link>

				<Link to={`/blog/${article.slug}`}>
					<p className='p-2 title text-gray'>
						{article.title.length > TITLE_CUT_LENGTH
							? article.title.substring(0, TITLE_CUT_LENGTH) +
							  "..."
							: article.title}
					</p>
				</Link>
			</div>
		</Tilt>
	);
}

export default ArticleCart;
