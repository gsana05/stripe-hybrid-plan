import {setUserAccessToken} from "../services/UserPaymentsService";
import React, { useRef, useState, useEffect  } from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const HandleSubmit = async () => {

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

const Success = () => {


  HandleSubmit();

  console.log("SUCCESS");

  const [token, setToken] = useState('');

  const saveAccessTokenToDatabase = async () => {
    //window.alert("Checking");
    const accessToken = await setUserAccessToken("abc");
    setToken(accessToken); 
}

  useEffect( () => {
    
    try{
      console.log("FIRED");
      saveAccessTokenToDatabase();
    }
    catch(error){
      const e = error as Error
      setToken(e.message);
    }


  }, [])

    return (
      <div>
        <h1>Success</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>{"Access token: " + token}</h2>
      </div>
    );
  };
  
  export default Success;
  