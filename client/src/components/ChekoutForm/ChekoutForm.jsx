import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from '../card-section/Card';

export default function CheckoutForm({stripeTokenHandler}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {



    if (!stripe || !elements) {

      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {

      console.log(result.error.message);
    } else {

      stripeTokenHandler(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Book ALL</button>
    </form>
  );
}