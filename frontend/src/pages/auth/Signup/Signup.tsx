import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../Oauth";
import signupImg from "../../../assets/imgs/signup.webp";
import { useTranslation } from "react-i18next";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { backend } from "../../../utils/backend";
import BasicLoader from "../../../loaders/spinner/BasicLoader";
interface Props {
	change: () => void;
}
function Signup(props: Props) {
	const { t } = useTranslation();

	const [formData, setFormdata] = useState({
		fullName: "",
		email: "",
		password: "",
		password2: "",
	});
	const [err, setErr] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const handleFormChange = (e: any) => {
		setErr("");
		setSuccess("");
		setFormdata({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (
			isEmpty(formData.fullName) ||
			isEmpty(formData.email) ||
			isEmpty(formData.password) ||
			isEmpty(formData.password2)
		) {
			setErr("All fields are required");
		} else if (!isEmail(formData.email)) {
			setErr("Invalid email format");
		} else if (formData.password !== formData.password2) {
			setErr("Passwords are not equal");
		} else if (formData.password.length < 6) {
			setErr("Password length must be at least 6 characters");
		} else {
			setLoading(true);
			let { fullName, email, password } = formData;
			let name = fullName.split(" ").slice(0, -1).join(" ");
			let surname = fullName.split(" ").slice(-1).join("");

			let body = { name, surname, email, password };

			backend({ url: "/auth/signup", method: "post", data: body })
				.then((response) => {
					if (response.status === 201 || response.status === 200) {
						setSuccess("Successfuly created! Please login");
						setErr("");
						setFormdata({
							fullName: "",
							email: "",
							password: "",
							password2: "",
						});
						setLoading(false);
					} else {
						setErr("Something went wrong");
						setLoading(false);
					}
				})
				.catch((e) => {
					if (e.response.data.code === 400) {
						setErr("Email already exist");
						setLoading(false);
					} else {
						setErr("Something went wrong");
						setLoading(false);
					}
				});
		}
	};
	return (
		<div className='user signupBx'>
			<div className='formBx'>
				<form>
					<h2>{t("login.title")}</h2>
					<OAuth />
					<small
						className='my-2'
						style={{
							color: `${err ? "red" : "green"}`,
							textAlign: "center",
						}}>
						{err ? err : success}
					</small>
					<input
						type='text'
						placeholder={t("login.name")}
						id='fullName'
						onChange={handleFormChange}
					/>
					<input
						type='email'
						placeholder={t("login.email")}
						id='email'
						onChange={handleFormChange}
					/>
					<input
						type='password'
						placeholder={t("login.password")}
						id='password'
						onChange={handleFormChange}
					/>
					<input
						type='password'
						placeholder={t("login.password2")}
						id='password2'
						onChange={handleFormChange}
					/>

					<button onClick={handleSubmit}>
						{loading && <BasicLoader size='sm' />}

						{t("login.signup")}
					</button>
					<p className='signup'>
						{t("login.yesAccount")}
						<Link
							to='/login'
							onClick={props.change}
							className='ml-2'>
							{t("login.login")}
						</Link>
					</p>
				</form>
			</div>
			<div className='imgBx'>
				<img src={signupImg} alt='' />
			</div>
		</div>
	);
}

export default Signup;
