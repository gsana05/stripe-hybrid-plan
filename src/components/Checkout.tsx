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
import emailjs from '@emailjs/browser';
import nodemailer from 'nodemailer';

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

      if(validateEmail(email)){
        redirectToCheckout();
      }
      else{
        console.log("Please enter email");
      }

      
    }
    
  }, [getUnpaidPendingAccessToken])

  const validateEmail = (email : string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function setThePendingAccessToken(){

    sendEmail();

    // console.log("TESTING", pendingAccessToken);
    // window.alert(pendingAccessToken);
    // dispatch(setPendingPurchasedTokenRequest.setPendingPurchasedToken({token: pendingAccessToken}));
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
        customerEmail: email,
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

  // set & get email
  const [email, setEmail] = useState("");

  function setEmailInput(event : any) {
      const input = (event.target as any).value;
      setEmail(input);
  }

  const sendEmail = () => {
    //e.preventDefault();

    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: 'sanashee05@hotmail.com', // generated ethereal user
    //     pass: '#123Brouft05', // generated ethereal password
    //   },
    // });

    // let info = transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: "sanashee05@hotmail.com, garethsanasheefitness@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });

  //   var templateParams = {
  //     to_name: 'Gareth',
  //     from_name: 'Hybrid athlete',
  //     message: 'WORKING'
  // };

  //   emailjs.send('service_sti2nff', 'template_ekohckb', templateParams, 'CNVOgctFYh2K6ztS9')
  //     .then((result) => {
  //         console.log(result.text);
  //     }, (error) => {
  //         console.log(error.text);
  //     });
  };

  return (

    <Elements stripe={getStripe()} options={options}>

      <div className="checkout">
          <h1>HYBRID ATHLETE PLAN</h1>
          <h1 className="checkout-price">£0.30</h1>
          <img
            className="checkout-product-image"
            src={ProductImage}
            alt="Product"
          />
          <h4>Please enter your email before purchase</h4>
          <input className='measurements input' type="email"  onChange={setEmailInput} value={email} />
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
