import {setUserAccessToken} from "../services/UserPaymentsService";
import React, { useRef, useState, useEffect  } from "react";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useSearchParams, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPurchasedTokenRequest, getPendingPurchasedTokenRequest } from "../actions/actions";
import { getUnpaidPendingAccessTokenSelector, getUnpaidPendingSelector, getUnpaidErrorSelector } from "../selectors/dashboardSelectors";
import { updateTicketPromise } from "../routines/routines";
import { PendingPurchasedToken } from "../types/Types";


const Success = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [tokenSuccess, setTokenSuccess] = useState(false);

  const accessToken = useSelector(getUnpaidPendingAccessTokenSelector);

  useEffect( () => {

    console.log("accessToken", accessToken?.token);
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

    
  }, [accessToken])

  

  useEffect( () => {

    if(id !== undefined){
      dispatch(getPendingPurchasedTokenRequest.getPendingPurchasedToken({token: id}))
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
  