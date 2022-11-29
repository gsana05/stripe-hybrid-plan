import axios from "axios";
import { all, call, put, takeLatest, take } from "redux-saga/effects";

import { fetchAstronautFailure, fetchAstronautSuccess } from "../actions/actions";
import { FETCH_ASTRONAUT_REQUEST } from "../actions/actionTypes";
import { Astronaut } from "../types/Types";
import { SagaIterator } from '@redux-saga/types';

import {auth, db} from '../firebase';
import {EventChannel, eventChannel} from 'redux-saga';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { resolve } from "path";
const usersCollectionRef = collection(db, "astronauts");

export async function listenerForAllAstronauts() {

    const allAstronauts : Astronaut[] = []; 

    try{

        return new Promise<Astronaut[]>((resolve) => {


            onSnapshot(usersCollectionRef,

                (snapshot) => {
    
                    if (snapshot.docs.length > 0) {
                        snapshot.docs.forEach((doc) => {
                            const astronaut = doc.data() as Astronaut;
                            console.log("name: " + astronaut.name);
                            allAstronauts.push(astronaut);
                            //console.log(allEmails.length);
                        });
    
                        resolve(allAstronauts)
                        return allAstronauts;
    
    
                    }
                    else {
    
                        alert("Error");
    
                    }
    
    
    
                },
                (error) => {
                    alert(error);
                }
    
            );


        });
        
        

    }catch(e){
        alert(e);
    }

   
}

export async function getAllAstronauts() : Promise<Astronaut[]> {
  
    const allAstronauts : Astronaut[] = []; 
  
    const getAstronauts = async () => {

        
        const data = await getDocs(usersCollectionRef);
       
        data.docs.map((doc) => {
  
            const astronaut = doc.data() as Astronaut;
            console.log(astronaut.name)
            allAstronauts.push(astronaut);
  
        })
  
        //window.alert("al:: " + allAstronauts);
        return allAstronauts;
    }
  
    try{
        return getAstronauts();
    }catch(error){
        throw Error("");
    }
  
  }

/*

You should never be calling the await function directly inside the saga-generator,
 because redux-saga is for orchestrating the side-effects.
Therefore, any time that you want to run a side-effect you should do it by yielding the side-effect through a redux-saga effect (usually: call or fork).
 If you do it directly without yielding it through a redux-saga effect, then redux-saga won't be able to orchestrate the side-effect.
If you think about it, the redux-saga generator is completely testable without the need of mocking anything.
 Also, it helps to keep things decoupled: if your apiFetchFoo returned a promise, the saga would still work the same.

https://stackoverflow.com/questions/43443620/redux-saga-async-await-pattern

*/

function* updateFetchAstronautSaga() : SagaIterator{

}

// each time the action FETCH_ASTRONAUT_REQUEST is called this function fires 
function* fetchAstronautSaga() : SagaIterator{

    /*

    call and put are both effect creator functions 

    CALL: Instructs middleware to call the promise. Call is a promise which allows other tasks to execute whilst this task is in progress
    PUT: instructs middleware to dispatch an action to the store which updates state of app

    */

    // call and apply are well suited for functions that return Promise results.
    const results = yield call(listenerForAllAstronauts); // watcher function 
    yield put(
        fetchAstronautSuccess({
          astronauts: results,
        })    
    );

}

// called when app is first launched to set up listener on the action FETCH_ASTRONAUT_REQUEST
function* astronautSagaFirebase() {
    
    /*
    TAKE EVERY
    allows multiple fetchData instances to be started concurrently. At a given moment,
    we can start a new fetchData task while there are still one or more previous fetchData tasks which have not yet terminated.

    TAKE LATEST
    If we want to only get the response of the latest request fired 
    (e.g. to always display the latest version of data) we can use the takeLatest helper:
    takeLatest allows only one fetchData task to run at any moment.
    And it will be the latest started task. If a previous task is still running when another fetchData task is started,
    the previous task will be automatically cancelled.

    */

    yield all([takeLatest(FETCH_ASTRONAUT_REQUEST, fetchAstronautSaga)]);
}
  
  export default astronautSagaFirebase;