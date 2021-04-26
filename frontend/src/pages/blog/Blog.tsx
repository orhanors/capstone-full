import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ArticleCart from "../../components/articleCart/ArticleCart";
import { backend } from "../../utils/backend";
import { IArticle } from "../../types/article.d";
import ArticleSuggestCart from "../../components/articleSuggestCart/ArticleSuggestCart";
import HeartbeatLoader from "../../loaders/heartbeat/HeartbeatLoader";

function Blog() {
	const LATEST_ARTICLES_LIMIT = 4;
	const [articles, setArticles] = useState<IArticle[]>([]);
	const [latest, setLatest] = useState<IArticle[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const getArticles = async () => {
		setLoading(true);
		try {
			const response = await backend({ url: "/blog?page=1&limit=10" });
			if (response.status === 200) {
				setArticles(response.data);
				setLoading(false);
			} else {
				setError("Something went wrong!");
				setLoading(false);
			}
		} catch (error) {
			setError("Something went wrong!");
			setLoading(false);
		}
	};

	const getLatestArticles = async () => {
		setLoading(true);
		try {
			const response = await backend({
				url: `/blog/latestArticles/${LATEST_ARTICLES_LIMIT}`,
			});

			if (response.status === 200) {
				setLatest(response.data);
				setLoading(false);
			} else {
				setError("Something went wrong!");
				setLoading(false);
			}
		} catch (error) {
			setError("Something went wrong!");
			setLoading(false);
		}
	};
	useEffect(() => {
		Promise.all([getArticles(), getLatestArticles()]);
	}, []);

	const showArticleCarts = () => {
		return (
			<div className='cards mt-5'>
				<Row>
					{articles.map((article) => {
						return (
							<Col md={6} key={article._id}>
								<ArticleCart article={article} />
							</Col>
						);
					})}
				</Row>
			</div>
		);
	};

	const showLatestArticles = () => {
		return (
			<div className='latest'>
				<h4 className='text-black mb-4'>Latest Posts</h4>
				<Row>
					{latest.map((article) => {
						return (
							<Col
								md={12}
								key={
									article._id + article.title.substring(0, 10)
								}>
								<ArticleSuggestCart article={article} />
							</Col>
						);
					})}
				</Row>
			</div>
		);
	};

	return (
		<div className='container mt-5'>
			{loading && <HeartbeatLoader />}
			{!loading && !error && (
				<Row>
					<Col md={8}>{showArticleCarts()}</Col>
					<Col md={4}>{showLatestArticles()}</Col>
				</Row>
			)}
		</div>
	);
}

export default Blog;
