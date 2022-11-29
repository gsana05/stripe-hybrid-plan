import { useState } from "react";

import CardIcon from "../images/credit-card.jpg";
import ProductImage from "../images/product-image.jpg";

import getStripe from "../../stripe/Stripe";
import { useStripe, Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutInApp() {
    const options = {
      // passing the client secret obtained from the server
      clientSecret: process.env.STRIPE_SECRET_KEY,
    };
  
    return (
      <Elements stripe={getStripe()} options={options}>
        <CheckoutForm />
      </Elements>
    );
  };

  