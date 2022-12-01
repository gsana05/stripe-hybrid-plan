import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { setPurchasedTokenFailure, setPurchasedTokenSuccess } from "../actions/actions";
import { SET_PURCHASE_TOKEN_REQUEST_REQUEST } from "../actions/actionTypes";
import { PurchasedToken } from "../types/Types";
import { SagaIterator } from '@redux-saga/types';

import {auth, db} from '../firebase';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import {setUserAccessToken} from "../services/UserPaymentsService";

const usersCollectionRef = collection(db, "astronauts");

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

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.


  Each time the action: FETCH_TODO_REQUEST is called -> the function fetchTodoSaga is called

*/
function* astronautSaga() {
  yield all([takeLatest(SET_PURCHASE_TOKEN_REQUEST_REQUEST, setPurchaseTokenSaga)]);
}

export default astronautSaga;