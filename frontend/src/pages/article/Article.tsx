import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { backend } from "../../utils/backend";
import { RouteComponentProps } from "react-router";
import { IArticle } from "../../types/article.d";
import ReactQuill from "react-quill";
import { Row, Col } from "react-bootstrap";
import { FaFacebook, FaWhatsappSquare } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	LinkedinShareButton,
} from "react-share";
import "./article.scss";
import { GENERIC_ERROR_MSG } from "../../utils/constants";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";
interface MatchParams {
	slug: string;
}

interface ArticleProps extends RouteComponentProps<MatchParams> {}
function Article(props: ArticleProps) {
	const [article, setArticle] = useState<null | IArticle>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const getArticle = async () => {
		setLoading(true);
		try {
			const response = await backend({
				url: `/blog/article/${props.match.params.slug}`,
			});
			if (response.status === 200) {
				setLoading(false);
				setArticle(response.data);
			} else {
				setLoading(false);
				setError(GENERIC_ERROR_MSG);
			}
		} catch (error) {
			setLoading(false);
			setError(GENERIC_ERROR_MSG);
		}
	};

	useEffect(() => {
		getArticle();
	}, []);

	const showSocialIcons = () => {
		return (
			<>
				{" "}
				<FacebookShareButton url={window.location.href}>
					<span className='fb'>
						<FaFacebook />
					</span>
				</FacebookShareButton>
				<TwitterShareButton url={window.location.href}>
					<span className='twit'>
						<AiFillTwitterCircle />
					</span>
				</TwitterShareButton>
				<WhatsappShareButton url={window.location.href}>
					<span className='wp'>
						<FaWhatsappSquare />
					</span>
				</WhatsappShareButton>
				<LinkedinShareButton url={window.location.href}>
					<span className='lnk'>
						<AiFillLinkedin />
					</span>
				</LinkedinShareButton>
			</>
		);
	};
	const showArticle = () => {
		return (
			<div className='article-content-wrapper'>
				<h1 className='title text-center'>{article?.title}</h1>

				<div className='article-tags mt-4'>
					{article?.tags.map((tag, index) => {
						return (
							<span
								className='tag'
								key={article._id + tag + index}>
								{tag}
							</span>
						);
					})}
				</div>
				<hr />

				<div>
					<div>{}</div>
					<div className='share-icons mb-4 float-right'>
						{showSocialIcons()}
					</div>
				</div>

				{article && (
					<div
						className='article-content'
						dangerouslySetInnerHTML={{
							__html: article.content,
						}}
					/>
				)}
			</div>
		);
	};
	const showLatestArticles = () => {};
	return (
		<div className='container mt-5 article-wrapper'>
			{loading && <HeartbeatLoader />}
			{!error && !loading && (
				<Row>
					<Col md={8}>{showArticle()}</Col>
					<Col md={4}></Col>
				</Row>
			)}
		</div>
	);
}

export default withRouter(Article);
