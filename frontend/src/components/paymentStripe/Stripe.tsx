import React, { useMemo } from "react";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import "./stripe.scss";
const stripePromise = loadStripe(
	"pk_test_51IaoRPKuGkFtoAxVEzEG3Sc1hIrwDTmetZNN4m5rVQEqHCXs9OZ58VnsW7vHL1DYNsswQVhFn7Z2mzflGEiVb0vg00dgCiTZiE"
);

const Stripe = () => {
	return (
		<div className='payment-wrapper container'>
			<Elements stripe={stripePromise}>
				<div className='card-info'>
					<CheckoutForm />
				</div>
			</Elements>
		</div>
	);
};

export default Stripe;
