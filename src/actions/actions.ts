import {
    SET_PURCHASE_TOKEN_REQUEST_REQUEST,
    SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PURCHASE_TOKEN_REQUEST_FAILURE
  } 
  from "./actionTypes";

  import {
    SetPurchaseTokenRequest,
    FetchPurchaseTokenSuccessPayload,
    SetPurchaseTokenSuccess,
    FetchPurchaseTokenFailurePayload,
    SetPurchaseTokenFailure
  } from "../types/Types";

  export const setPurchasedTokenRequest = (): SetPurchaseTokenRequest => ({
    type: SET_PURCHASE_TOKEN_REQUEST_REQUEST
  });

  export const setPurchasedTokenSuccess = (
    payload: FetchPurchaseTokenSuccessPayload
  ): SetPurchaseTokenSuccess => ({
    type: SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    payload,
  });

  export const setPurchasedTokenFailure = (
    payload: FetchPurchaseTokenFailurePayload
  ): SetPurchaseTokenFailure => ({
    type: SET_PURCHASE_TOKEN_REQUEST_FAILURE,
    payload,
  });
  