import {setUserAccessToken} from "../services/UserPaymentsService";
import React, { useRef, useState, useEffect  } from "react";

const Success = () => {


  console.log("SUCCESS");

  const [token, setToken] = useState('');

  const saveAccessTokenToDatabase = async () => {
    //window.alert("Checking");
    const accessToken = await setUserAccessToken("abc");
    setToken(accessToken); 
}

  useEffect( () => {
    
    try{
      console.log("FIRED");
      saveAccessTokenToDatabase();
    }
    catch(error){
      const e = error as Error
      setToken(e.message);
    }


  }, [])

    return (
      <div>
        <h1>Success</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>{"Access token: " + token}</h2>
      </div>
    );
  };
  
  export default Success;
  