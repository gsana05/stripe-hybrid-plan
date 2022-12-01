import {setUserAccessToken} from "../services/UserPaymentsService";
import React, { useRef, useState, useEffect  } from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';


const Success = () => {

  console.log("SUCCESS");

  const [token, setToken] = useState('');

    return (
      <div>
        <h1>Success</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>{"Access token: " + token}</h2>
      </div>
    );
  };
  
  export default Success;
  