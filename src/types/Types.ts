import {
    SET_PURCHASE_TOKEN_REQUEST_REQUEST,
    SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PURCHASE_TOKEN_REQUEST_FAILURE,
    SET_PENDING_PURCHASE_TOKEN_REQUEST,
    SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
    GET_PENDING_PURCHASE_TOKEN_REQUEST,
    GET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
    GET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE
  } 
  from "../actions/actionTypes";

  // PENDING PURCHASE TOKEN
  export interface FetchPendingPurchaseTokenSuccessPayload {
    pendingPurchaseToken: PendingPurchasedToken;
  }

  export interface PendingPurchasedToken {
    token: string
};

export type testing = {};

  export interface FetchPendingPurchaseTokenFailurePayload {
    error: string;
  }

  export interface SetPendingPurchaseTokenRequest {
    type: typeof SET_PENDING_PURCHASE_TOKEN_REQUEST
  }

  export interface SetPendingPurchaseTokenSuccess {
    type: typeof SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS
    payload: FetchPendingPurchaseTokenSuccessPayload;
  }

  export interface SetPendingPurchaseTokenFailure {
    type: typeof SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE
    payload: FetchPendingPurchaseTokenFailurePayload;
  }

  export interface GetPendingPurchaseTokenRequest {
    type: typeof GET_PENDING_PURCHASE_TOKEN_REQUEST
  }

  export interface GetPendingPurchaseTokenSuccess {
    type: typeof GET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS
    payload: FetchPendingPurchaseTokenSuccessPayload;
  }

  export interface GetPendingPurchaseTokenFailure {
    type: typeof GET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE
    payload: FetchPendingPurchaseTokenFailurePayload;
  }

  export type PendingPurchasedTokenActions =
    | SetPendingPurchaseTokenRequest
    | SetPendingPurchaseTokenSuccess
    | SetPendingPurchaseTokenFailure

// PURCHASED

export interface PendingPurchaseTokenState {
  pending: boolean;
  token: string | null;
  error: string | null;
}
export interface PurchaseTokenState {
  paidPending: boolean;
  unpaidPending: boolean;

  paidToken: PurchasedToken | null;
  unpaidPendingAccessToken: PendingPurchasedToken | null;

  paidError: string | null;
  unpaidError: string | null;
  
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
  | SetPendingPurchaseTokenRequest
  | SetPendingPurchaseTokenSuccess
  | SetPendingPurchaseTokenFailure
  | GetPendingPurchaseTokenRequest
  | GetPendingPurchaseTokenFailure
  | GetPendingPurchaseTokenSuccess

