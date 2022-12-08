import {
    SET_PURCHASE_TOKEN_REQUEST_REQUEST,
    SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PURCHASE_TOKEN_REQUEST_FAILURE,

    SET_PENDING_PURCHASE_TOKEN_REQUEST,
    SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
    GET_PENDING_PURCHASE_TOKEN_REQUEST,
    GET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
    GET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS
  } 
  from "./actionTypes";

  import {
    SetPurchaseTokenRequest,
    FetchPurchaseTokenSuccessPayload,
    SetPurchaseTokenSuccess,
    FetchPurchaseTokenFailurePayload,
    SetPurchaseTokenFailure,
    SetPendingPurchaseTokenRequest,
    FetchPendingPurchaseTokenSuccessPayload,
    SetPendingPurchaseTokenSuccess,
    FetchPendingPurchaseTokenFailurePayload,
    SetPendingPurchaseTokenFailure,
    PendingPurchasedToken,
    GetPendingPurchaseTokenRequest,
    GetPendingPurchaseTokenSuccess,
    GetPendingPurchaseTokenFailure
  } from "../types/Types";
import { ActionsUnion, ActionWithPayload, createAction } from "../utils/redux";


export const getPendingPurchasedTokenRequest = (): GetPendingPurchaseTokenRequest => ({
  type: GET_PENDING_PURCHASE_TOKEN_REQUEST
});

export const GetPendingPurchasedTokenSuccess = (
  payload: FetchPendingPurchaseTokenSuccessPayload
): GetPendingPurchaseTokenSuccess => ({
  type: GET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
  payload,
});

export const getPendingPurchasedTokenFailure = (
  payload: FetchPendingPurchaseTokenFailurePayload
): GetPendingPurchaseTokenFailure => ({
  type: GET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
  payload,
});

  export const setPendingPurchasedTokenRequest = (): SetPendingPurchaseTokenRequest => ({
    type: SET_PENDING_PURCHASE_TOKEN_REQUEST
  });

  export const setPendingPurchasedTokenSuccess = (
    payload: FetchPendingPurchaseTokenSuccessPayload
  ): SetPendingPurchaseTokenSuccess => ({
    type: SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
    payload,
  });

  

  export const setPendingPurchasedTokenFailure = (
    payload: FetchPendingPurchaseTokenFailurePayload
  ): SetPendingPurchaseTokenFailure => ({
    type: SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
    payload,
  });

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