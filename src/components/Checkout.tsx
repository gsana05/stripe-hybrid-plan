import { useState } from "react";

import CardIcon from "../images/credit-card.jpg";
import ProductImage from "../images/product-image.jpg";

import "../styles.css";

import getStripe from "../../src/stripe/Stripe";
import { useStripe, Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const [stripeError, setStripeError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const HandleSubmit = async () => {

    console.log("CONFIRM ERROR:");

    const stripe = useStripe();
    const elements = useElements();
  
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
  
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });
  
    console.log("CONFIRM ERROR:", error);
    
  
  }

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    if(stripe !== null){
      //const { error } = await stripe.redirectToCheckout(checkoutOptions);

      console.log("stripe.retrievePaymentIntent: " + stripe.retrievePaymentIntent);
      console.log("stripe.retrieveOrder: " + stripe.retrieveOrder);
      

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1M6qTBHLz4JOaSbM34Yn4Uiw",
            quantity: 1,
          },
        ],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
        customerEmail: 'customer@email.com',
      });

      console.log("Stripe checkout error", error);

      if (error) {
        setStripeError(error.message ? error.message : "ERROR");  
      }

      setLoading(false);

    }
    
  };

  if (stripeError) alert(stripeError);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.STRIPE_SECRET_KEY,
  };

  return (

    <Elements stripe={getStripe()} options={options}>

      <div className="checkout">
          <h1>HYBRID ATHLETE PLAN</h1>
          <h1 className="checkout-price">$19</h1>
          <img
            className="checkout-product-image"
            src={ProductImage}
            alt="Product"
          />
          <button
            className="checkout-button"
            onClick={redirectToCheckout}
            disabled={isLoading}
          >
            <div className="grey-circle">
              <div className="purple-circle">
                <img className="icon" src={CardIcon} alt="credit-card-icon" />
              </div>
            </div>
            <div className="text-container">
              <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
            </div>
          </button>
        </div>

    </Elements>

  );
};

export default Checkout;
