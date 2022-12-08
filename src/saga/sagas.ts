import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { getPendingPurchasedTokenFailure, GetPendingPurchasedTokenSuccess, setPendingPurchasedTokenFailure, setPendingPurchasedTokenSuccess, setPurchasedTokenFailure, setPurchasedTokenSuccess } from "../actions/actions";
import { GET_PENDING_PURCHASE_TOKEN_REQUEST, SET_PENDING_PURCHASE_TOKEN_REQUEST, SET_PURCHASE_TOKEN_REQUEST_REQUEST } from "../actions/actionTypes";
import { PendingPurchasedToken, PurchasedToken } from "../types/Types";
import { SagaIterator } from '@redux-saga/types';
import {generateRandomString, getPendingAccessTokens, setPendingUserAccessToken, setUserAccessToken} from "../services/UserPaymentsService";

export async function setPurchaseToken() : Promise<PurchasedToken> {
 

  const getAstronauts = async () => {

    const accessToken = await setUserAccessToken();
    return accessToken;
  }

  try{
      return getAstronauts();
  }catch(error){
      throw Error("");
  }

}

export async function getPendingPurchaseToken(pendingAccessToken: string) : Promise<PendingPurchasedToken[]> {
 

  const setPendingAccessToken = async () => {

    const accessToken = await getPendingAccessTokens(pendingAccessToken);
    console.log("accessToken", accessToken);
    return accessToken;
  }

  try{
      return setPendingAccessToken();
  }catch(error){
      throw Error("");
  }

}

export async function setPendingPurchaseToken() : Promise<PendingPurchasedToken> {
 

  const setPendingAccessToken = async () => {

    const pendingAccessToken = generateRandomString(10, false);

    const accessToken = await setPendingUserAccessToken(pendingAccessToken);
    console.log("accessToken", accessToken);
    return accessToken;
  }

  try{
      return setPendingAccessToken();
  }catch(error){
      throw Error("");
  }

}

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* setPurchaseTokenSaga() : SagaIterator{

    try {

      //CALL - 
        const response = yield call(setPurchaseToken);

        window.alert("data:: " + response.data);

        yield put(
          setPurchasedTokenSuccess({
            purchaseToken: response.data,
          })
          
        );

      } catch (e : any) {

        yield put(
          setPurchasedTokenFailure({
            error: e.message,
          })
        );

        window.alert("ERROR");

      }
} 


function* setPendingPurchaseTokenSaga() : SagaIterator{

  try {

    //CALL - 
      const response = yield call(setPendingPurchaseToken);

      const pendingPurchasedToken = response as PendingPurchasedToken

      console.log("data:: " + pendingPurchasedToken.token);

      yield put(
        setPendingPurchasedTokenSuccess({
          pendingPurchaseToken: pendingPurchasedToken,
        })
        
      );

    } catch (e : any) {

      yield put(
        setPendingPurchasedTokenFailure({
          error: e.message,
        })
      );

      window.alert("ERROR: " + e.message);

    }
} 

function* getPendingPurchaseTokenSaga(): SagaIterator {

  console.log("UPDATE FIRED SUCCESS");

  try {

    console.log("UPDATE FIRED SUCCESS");

    const pendingAccessToken = "5qliSqARHr"

    //CALL - 
      const response = yield call(getPendingPurchaseToken, pendingAccessToken);

      const pendingPurchasedToken = response as PendingPurchasedToken[]

      console.log("data:: " + pendingPurchasedToken.length);

      if(pendingAccessToken.length > 0){
        yield put(
          GetPendingPurchasedTokenSuccess({
            pendingPurchaseToken: pendingPurchasedToken[0],
          })
          
        );
      }

    } catch (e : any) {

      console.log("UPDATE FIRED Fail");

      yield put(
        getPendingPurchasedTokenFailure({
          error: e.message,
        })
      );

      window.alert("ERROR: " + e.message);

    }
} 

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.


  Each time the action: FETCH_TODO_REQUEST is called -> the function fetchTodoSaga is called

*/
function* astronautSaga() {
  yield all([
    takeLatest(SET_PURCHASE_TOKEN_REQUEST_REQUEST, setPurchaseTokenSaga),
    takeLatest(SET_PENDING_PURCHASE_TOKEN_REQUEST, setPendingPurchaseTokenSaga),
    takeLatest(GET_PENDING_PURCHASE_TOKEN_REQUEST, getPendingPurchaseTokenSaga)
  ]);
}

export default astronautSaga;