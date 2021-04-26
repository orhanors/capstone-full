import React, { useMemo, useState } from "react";
import useResponsiveFontSize from "../../hooks/useResponsiveFontSize";
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	Elements,
} from "@stripe/react-stripe-js";
import "./stripe.scss";
import { PaymentMethodCreateParams } from "@stripe/stripe-js";
import { useSelector } from "../../store/_helpers/useCustomSelector";
import { useHistory } from "react-router-dom";
import { backend } from "../../utils/backend";
import { GENERIC_ERROR_MSG } from "../../utils/constants";

const useOptions = () => {
	const fontSize = useResponsiveFontSize();
	const options = useMemo(
		() => ({
			style: {
				base: {
					fontSize,
					color: "#424770",
					letterSpacing: "0.025em",
					fontFamily: "Source Code Pro, monospace",
					"::placeholder": {
						color: "#aab7c4",
					},
				},
				invalid: {
					color: "#9e2146",
				},
			},
		}),
		[fontSize]
	);

	return options;
};

function CheckoutForm() {
	const history = useHistory();
	const { data } = useSelector((store) => store.user);

	// const [loading, setLoading] = useState(false);
	const [cardNumber, setCardNumber] = useState<number | null>(null);
	const [error, setError] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}
		const billing_details: PaymentMethodCreateParams.BillingDetails = {
			email: data.email,
			name: data.name + " " + data.surname,
			phone: data.phone,
			address: {
				country: data.address?.country,
				city: data.address?.city,
				line1: data.address?.line1,
				line2: data.address?.line2,
				postal_code: String(data.address?.postalCode),
			},
		};

		const payload = await stripe.createPaymentMethod({
			type: "card",
			//@ts-ignore
			card: elements.getElement(CardNumberElement),
			billing_details,
		});

		// console.log("[PaymentMethod]", payload);

		if (payload.error) {
			setError(payload.error.message as string);
		} else {
			try {
				const response = await backend({
					url: "/order/new",
					method: "post",
				});
				if (response.status === 201) {
					// console.log("order response", response);
					history.push(`/orderReview/${response.data._id}`);
				}
			} catch (error) {
				setError(GENERIC_ERROR_MSG);
			}
		}
	};
	const getCheckoutForm = () => {
		return (
			<form onSubmit={handleSubmit} className='d-flex flex-column'>
				<label>
					Card number
					<CardNumberElement
						options={options}
						onReady={() => {
							console.log("CardNumberElement [ready]");
						}}
						onChange={(event) => {
							setError("");
						}}
						onBlur={() => {
							console.log("CardNumberElement [blur]");
						}}
						onFocus={() => {
							console.log("CardNumberElement [focus]");
						}}
					/>
				</label>
				<label>
					Expiration date
					<CardExpiryElement
						options={options}
						onReady={() => {
							console.log("CardNumberElement [ready]");
						}}
						onChange={(event) => {
							setError("");
						}}
						onBlur={() => {
							console.log("CardNumberElement [blur]");
						}}
						onFocus={() => {
							console.log("CardNumberElement [focus]");
						}}
					/>
				</label>
				<label>
					CVC
					<CardCvcElement
						options={options}
						onReady={() => {
							console.log("CardNumberElement [ready]");
						}}
						onChange={(event) => {
							setError("");
						}}
						onBlur={() => {
							console.log("CardNumberElement [blur]");
						}}
						onFocus={() => {
							console.log("CardNumberElement [focus]");
						}}
					/>
				</label>
				{error && (
					<small className='text-center text-danger'>{error}</small>
				)}
				<button type='submit' disabled={!stripe}>
					Pay
				</button>
			</form>
		);
	};
	return <div className='checkout-form'>{getCheckoutForm()}</div>;
}

export default CheckoutForm;
