import {
    SET_PURCHASE_TOKEN_REQUEST_REQUEST,
    SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PURCHASE_TOKEN_REQUEST_FAILURE
  } 
  from "../actions/actionTypes";

  export interface PurchaseTokenState {
    pending: boolean;
    token: PurchasedToken | null;
    error: string | null;
  }

  export interface FetchPurchaseTokenSuccessPayload {
    purchaseToken: PurchasedToken;
  }

  export interface PurchasedToken {
      accessToken: string,
      programPurchased: number,
      isUsed: boolean,
      date: Date
  };

  export interface FetchPurchaseTokenFailurePayload {
    error: string;
  }

  export interface SetPurchaseTokenRequest {
    type: typeof SET_PURCHASE_TOKEN_REQUEST_REQUEST
  }

  export interface SetPurchaseTokenSuccess {
    type: typeof SET_PURCHASE_TOKEN_REQUEST_SUCCESS
    payload: FetchPurchaseTokenSuccessPayload;
  }

  export interface SetPurchaseTokenFailure {
    type: typeof SET_PURCHASE_TOKEN_REQUEST_FAILURE
    payload: FetchPurchaseTokenFailurePayload;
  }

  export type PurchasedTokenActions =
    | SetPurchaseTokenRequest
    | SetPurchaseTokenSuccess
    | SetPurchaseTokenFailure