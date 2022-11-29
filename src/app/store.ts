import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import rootReducer from "../rootReducer/rootReducer";
import { rootSaga } from '../saga/rootSaga';

import { createStore, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware(); // Creates a Redux middleware and connects the Sagas to the Redux Store
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.
export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware
});

sagaMiddleware.run(rootSaga); // sets up the listners for the sagas

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
