import { useState, useEffect } from "react";
import CardIcon from "../images/credit-card.jpg";
import ProductImage from "../images/product-image.jpg";
import "../styles.css";
import getStripe from "../../src/stripe/Stripe";
import { useStripe, Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { setPendingPurchasedTokenRequest, setPurchasedTokenRequest } from "../actions/actions";
import { generateRandomString } from "../services/UserPaymentsService";
import { getUnpaidPendingAccessTokenSelector, getUnpaidPendingSelector, getUnpaidErrorSelector } from "../selectors/dashboardSelectors";

const Checkout = () => {
  const [stripeError, setStripeError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [token, setToken] = useState('');

  const dispatch = useDispatch();

  const getUnpaidPendingAccessToken = useSelector(getUnpaidPendingAccessTokenSelector);

  const pendingAccessToken = generateRandomString(10, false);

  function paymentSuccessful(accessToken: string) : string {
    // payment has successfully gone through
    console.log(getUnpaidPendingAccessToken?.token);
    console.log("payment success");
    return `${window.location.origin}/success/${getUnpaidPendingAccessToken?.token}`
  }

  useEffect( () => {

    console.log(getUnpaidPendingAccessToken?.token);

    const pendingAccessToken = getUnpaidPendingAccessToken?.token;
    console.log("SETTING PENDING ACCESS TOKEN: ", pendingAccessToken);
    //window.alert(pendingAccessToken);
    if(pendingAccessToken != null){
      redirectToCheckout();
    }
    
  }, [getUnpaidPendingAccessToken])

  function setThePendingAccessToken(){
    console.log("TESTING", pendingAccessToken);
    window.alert(pendingAccessToken);
    dispatch(setPendingPurchasedTokenRequest.setPendingPurchasedToken({token: pendingAccessToken}));
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
        successUrl: paymentSuccessful(pendingAccessToken),
        cancelUrl: `${window.location.origin}/cancel`,
        clientReferenceId: getUnpaidPendingAccessToken?.token
      });

      console.log("Stripe checkout error", error);

      if (error) {
        setStripeError(error.message ? error.message : "ERROR");  
      }
      else{
        console.log("Payment was successful");
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
            onClick={setThePendingAccessToken}
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
