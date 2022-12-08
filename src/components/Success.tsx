import {setUserAccessToken} from "../services/UserPaymentsService";
import React, { useRef, useState, useEffect  } from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPendingPurchasedTokenRequest, setPurchasedTokenRequest, testingSagaParams } from "../actions/actions";
import { getUnpaidPendingAccessTokenSelector, getUnpaidPendingSelector, getUnpaidErrorSelector } from "../selectors/dashboardSelectors";
import { updateTicketPromise } from "../routines/routines";
import { PendingPurchasedToken } from "../types/Types";


const Success = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [tokenSuccess, setTokenSuccess] = useState(false);

  const accessToken = useSelector(getUnpaidPendingAccessTokenSelector);

  useEffect( () => {

    console.log("HERE TOKEN: ", accessToken?.token);

    
  }, [accessToken])

  

  useEffect( () => {

    //dispatch(getPendingPurchasedTokenRequest());
    dispatch(testingSagaParams.updateTicketTest({token: "J4IyvRkoor"}))
    

    console.log("accessToken", accessToken);
    console.log("id", id);
    if(accessToken?.token === id){
      dispatch(setPurchasedTokenRequest());
      console.log("SUCCESS");
      setTokenSuccess(true);
    }
    else{
      console.log("PURCHASE ID IS INVALID");
      setTokenSuccess(false);
    }
  }, [])

    return (
      
      <div>

      { //Check if message failed
        (tokenSuccess === false)
          ? <div> 
              <h1>Error</h1>
              <h2>Please make a purchase!</h2>
            </div> 
          : <div>  
              <h1>Success</h1>
              <h2>Thank you for your purchase!</h2>
              <h2>{"Access token: " + id}</h2>
            </div> 
      }

       
      </div>
    );
  };
  
  export default Success;
  