import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import OAuth from "../Oauth";
import loginImg from "../../../assets/imgs/login.webp";
import { useTranslation } from "react-i18next";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { backend } from "../../../utils/backend";
import BasicLoader from "../../../loaders/spinner/BasicLoader";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../store/user/user";
interface Props {
	change: () => void;
}
function Login(props: Props) {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const handleFormChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (isEmpty(formData.email) || isEmpty(formData.password)) {
			setErr("All fields are required");
		} else if (!isEmail(formData.email)) {
			setErr("Invalid email format");
		} else {
			setLoading(true);
			const { email, password } = formData;

			const body = { email, password };

			backend({ url: "/auth/login", method: "post", data: body })
				.then((response) => {
					if (response.status === 201 || response.status === 200) {
						setLoading(false);
						dispatch(getUserProfile());
						history.push("/");
					}
				})
				.catch((e) => {
					if (e?.response?.status === 400) {
						setErr(e.response.data?.errors);
						setLoading(false);
					} else {
						setErr("Something went wrong!");
						setLoading(false);
					}
				});
		}
	};
	return (
		<div className='user signinBx'>
			<div className='imgBx'>
				<img src={loginImg} alt='' />
			</div>
			<div className='formBx'>
				<form>
					<h2>{t("login.login")}</h2>
					<OAuth />
					<small
						className='my-2'
						style={{ color: "red", textAlign: "center" }}>
						{err}
					</small>
					<input
						type='email'
						placeholder={t("login.email")}
						value={formData.email}
						name='email'
						onChange={handleFormChange}
					/>
					<input
						type='password'
						placeholder={t("login.enterPassw")}
						value={formData.password}
						name='password'
						onChange={handleFormChange}
					/>
					<button onClick={handleSubmit}>
						{" "}
						{loading && <BasicLoader size='sm' />}{" "}
						{t("login.login")}
					</button>
					<p className='signup'>
						{t("login.noAccount")}
						<Link
							to='/login'
							onClick={props.change}
							className='ml-2'>
							{t("login.signup")}
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
