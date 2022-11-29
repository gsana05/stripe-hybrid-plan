import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchAstronautFailure, fetchAstronautSuccess } from "../actions/actions";
import { FETCH_ASTRONAUT_REQUEST } from "../actions/actionTypes";
import { Astronaut } from "../types/Types";
import { SagaIterator } from '@redux-saga/types';

import {auth, db} from '../firebase';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
const usersCollectionRef = collection(db, "astronauts");

export async function getAllAstronauts() : Promise<Astronaut[]> {

  //let allAstronauts : Array<Astronaut> =[];

  const allAstronauts : Astronaut[] = []; 

  const getAstronauts = async () => {
      const data = await getDocs(usersCollectionRef);
     
      data.docs.map((doc) => {

          const astronaut = doc.data() as Astronaut;
          allAstronauts.push(astronaut);

      })

      window.alert(allAstronauts);
      return allAstronauts;
  }

  try{
      return getAstronauts();
  }catch(error){
      throw Error("");
  }

}

const getAstronauts = () => axios.get<Astronaut[]>("https://jsonplaceholder.typicode.com/todos");

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchAstronautSaga() : SagaIterator{

    try {

      //CALL - 
        const response = yield call(getAstronauts);

        window.alert("data:: " + response.data);

        yield put(
          fetchAstronautSuccess({
            astronauts: response.data,
          })
          
        );

        // const test = response.data as Astronaut[]
        // const item = test[0]

        // window.alert(item.name);

      } catch (e : any) {

        yield put(
          fetchAstronautFailure({
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
  yield all([takeLatest(FETCH_ASTRONAUT_REQUEST, fetchAstronautSaga)]);
}

export default astronautSaga;