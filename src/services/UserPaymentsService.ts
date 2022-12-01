import {firebase} from '../firebase';
import { signInWithEmailAndPassword, Unsubscribe } from 'firebase/auth';
import {auth, db} from '../firebase';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { doc, setDoc  } from 'firebase/firestore';
import { PurchasedToken } from '../types/Types';

export async function setUserAccessToken() : Promise<PurchasedToken> {

    try{

        const accessToken = generateRandomString(10, false);
       
        const purchaseToken : PurchasedToken = {
            accessToken: accessToken,
            programPurchased: 1,
            isUsed: false,
            date: new Date()
        };
    
        await setDoc(doc(db, "AccessTokens", accessToken), purchaseToken);
        console.log("Success");
        return purchaseToken;

    }catch(error){
        console.log("ERROR: ", error);
        throw Error("");
    }

}


export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
    
    
export function generateRandomString(length: number, uppercase: boolean): string {
    let result = "";
    let characters = uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result
}
    

