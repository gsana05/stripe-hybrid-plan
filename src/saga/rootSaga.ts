import { all, fork } from "redux-saga/effects";

import astronautSaga from "./sagas";
import astronautSagaFirebase from "./sagasfirebase";

// The yield statement is great for representing asynchronous control flow in a linear style, but we also need to do things in parallel

export function* rootSaga() {

  // yeild ALL, effects will get executed in parallel
  // When we yield an array of effects, the generator is blocked until all the effects are resolved or as soon as one is rejected (just like how Promise.all behaves).
  yield all([

    // FORK - in a none-blocking call - whihch means side effects execute in the background thread in parallel
    //fork(astronautSaga),
    fork(astronautSagaFirebase)
  ]);
}