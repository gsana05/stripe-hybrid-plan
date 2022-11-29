import {
    FETCH_ASTRONAUT_REQUEST,
    FETCH_ASTRONAUT_SUCCESS,
    FETCH_ASTRONAUT_FAILURE,
  } 
  from "../actions/actionTypes";

export interface User {
    userId? : String,
    name : String,
    email : String,
    gender? : number, // 1 = male 2 = female
    age? : number,
    height? : number,
    weight? : number,
    notificationTokens? : Array<String>,
    dateJoined? : Date,
    notificationsEnabled? : Boolean,
    isAdmin? : boolean
}
  
  // firebase query
    export interface Astronaut {
      id: number;
      name: string;
    }
    
    // http with axios 
    // export interface Astronaut {
    //   userId: number;
    //   id: number;
    //   title: string;
    //   completed: boolean;
    // }
    
    export interface AstronautState {
      pending: boolean;
      astronauts: Astronaut[];
      error: string | null;
    }
    
    export interface FetchTodoSuccessPayload {
      astronauts: Astronaut[];
    }
    
    export interface FetchTodoFailurePayload {
      error: string;
    }
    
    // typeof -> Gets the type of variable: could be int, string, boolean ect.. 
    // In this case it is a string but could be changed in the future
    // type : string 
    export interface FetchAstronautRequest {
      type: typeof FETCH_ASTRONAUT_REQUEST;
    }
    
    export type FetchAstronautSuccess = {
      type: typeof FETCH_ASTRONAUT_SUCCESS;
      payload: FetchTodoSuccessPayload;
    };
    
    export type FetchAstronautFailure = {
      type: typeof FETCH_ASTRONAUT_FAILURE;
      payload: FetchTodoFailurePayload;
    };
    
    export type AstronautActions =
      | FetchAstronautRequest
      | FetchAstronautSuccess
      | FetchAstronautFailure;