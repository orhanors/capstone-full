import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Editor from "../../../components/editor/Editor";
import { RiErrorWarningLine } from "react-icons/ri";
import { backend } from "../../../utils/backend";
import "./addArticle.scss";
import BasicLoader from "../../../loaders/spinner/BasicLoader";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../store/notification/notification";
import UserLayout from "../../../layouts/userLayout/UserLayout";
import { useSelector } from "../../../store/_helpers/useCustomSelector";
import HeartbeatLoader from "../../../loaders/heartbeat/HeartbeatLoader";
function AddArticle() {
	const dispatch = useDispatch();
	const { user } = useSelector((store) => store);
	const [textHtml, setTextHtml] = useState({ value: null });
	const [title, setTitle] = useState("");
	const [warning, setWarning] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState<Array<string>>([]);

	const handleHtmlChange = (value: any) => {
		setTextHtml({ value });
	};

	const setInitialState = () => {
		setTags([]);
		setTitle("");
		setTextHtml({ value: null });
	};
	const hasTagExist = (tag: string) => {
		return tags.includes(tag);
	};
	const handleTagChange = (e: any) => {
		const userInput = e.target.value;
		if (e.keyCode === 13) {
			if (hasTagExist(userInput))
				return setWarning("'" + userInput + "'" + " already exist");
			setTag("");
			setTags([...tags, tag]);
		} else {
			setWarning("");
			setError("");
			setTag(userInput);
		}
	};

	const handleTagRemove = (e: any) => {
		const newTags = tags.filter((tag) => tag !== e.target.id);
		setTags(newTags);
		if (warning) setWarning("");
	};

	const generateSuccessNotification = () => {
		const notify = {
			message: "Successfully created! Go to",
			behavior: "warning",
			link: { to: "/myArticles", content: "My Articles" },
		};

		dispatch(setNotification(notify));
	};
	const handleAddArticle = async () => {
		if (title.length <= 5) {
			setError("Title must be at least 5 characters long");
		} else if ((textHtml.value! as string).length <= 10) {
			setError("Content must be at least 5 characters long");
		} else if (tags.length < 3) {
			setError("There should be at least 3 tags for content");
		} else {
			setLoading(true);
			const slug = title
				.split(" ")
				.join("-")
				.toLowerCase()
				.replaceAll(",", "");
			const articleBody = { title, tags, content: textHtml.value, slug };
			const response = await backend({
				url: "/blog/new",
				data: articleBody,
				method: "post",
			});
			if (response.status === 201) {
				//TODO:Do something
				setInitialState();
				setError("");
				setLoading(false);
				generateSuccessNotification();
			} else {
				setLoading(false);
				setError("Something went wrong!");
			}
		}
	};
	return (
		<UserLayout>
			<div className='add-article container mt-2'>
				<h5 className='text-left text-gray'>
					{" "}
					<strong className='text-black'>
						{user.data.name + ","}
					</strong>{" "}
					add new article about your products
				</h5>
				{!loading && (
					<>
						<div className=''>
							<RiErrorWarningLine />
							<small className='ml-1 text-secondary'>
								First image that you add will be header image
								for your article
							</small>
						</div>
						<input
							className='title mt-3'
							placeholder='TITLE'
							type='text'
							value={title}
							name='title'
							maxLength={70}
							onChange={(e: any) => setTitle(e.target.value)}
						/>
						<Editor
							html={textHtml.value!}
							handleChange={handleHtmlChange}
						/>
						<div className='tags my-4'>
							<Row>
								<Col
									md={12}
									className='d-flex justify-content-center mb-2'>
									<h5 className='text-center'>#tags</h5>
								</Col>
								<Col
									md={12}
									className='d-flex justify-content-center mb-2'>
									<input
										className='tag-input'
										placeholder={
											tags.length === 5
												? "You can add max 5 tags"
												: "Add a tag and press enter"
										}
										type='text'
										value={tag}
										disabled={
											tags.length === 5 ? true : false
										}
										name='tag'
										maxLength={50}
										onChange={handleTagChange}
										onKeyDown={handleTagChange}
									/>
								</Col>
								{warning && (
									<Col
										md={12}
										className='d-flex justify-content-center mb-2'>
										<small className='text-danger'>
											{warning}
										</small>
									</Col>
								)}
								<Col
									md={12}
									className='d-flex justify-content-center'>
									<div className='tag-list d-flex mt-3'>
										{tags.map((tag, index) => {
											return (
												<div
													className='tag-single-wrapper mx-2'
													key={tag + index}>
													<span className='tag-single'>
														{tag}
													</span>
													<span
														className='tag-close'
														id={tag}
														onClick={
															handleTagRemove
														}>
														x
													</span>{" "}
												</div>
											);
										})}
									</div>
								</Col>
							</Row>
						</div>{" "}
					</>
				)}
				{error && (
					<div className='d-flex justify-content-center mb-2'>
						<small className='text-danger'>{error}</small>
					</div>
				)}
				{loading && (
					<div className='mt-5'>
						{/* <BasicLoader />{" "} */}

						<HeartbeatLoader />
					</div>
				)}
				<button
					className='publish-btn mb-5 w-100'
					onClick={handleAddArticle}>
					Publish
				</button>
			</div>
		</UserLayout>
	);
}

export default AddArticle;
