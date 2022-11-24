import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyDlN7V3B3f_m8ZnT-jX79iAIRmXAOPXlJ0",
    authDomain: "hybrid-athlete-plan.firebaseapp.com",
    projectId: "hybrid-athlete-plan",
    storageBucket: "hybrid-athlete-plan.appspot.com",
    messagingSenderId: "224015852775",
    appId: "1:224015852775:web:cb4a1d07e52d6695a16e42",
    measurementId: "G-HGFQCKCE3R"
  };
  
 
  const app = firebase.initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const db = getFirestore(app);

  export {firebase};
  