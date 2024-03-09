import { auth } from "../../firebase-config.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { Error } from "../types.ts";


import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config.ts";
/**
 *
 * @param email
 * @param password
 * @returns 0 if success. Otherwise returns a object with error code and message
 */
export async function FirebaseRegister(username: string, email: string, password: string) {
  // Add user to authentication systen
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password).catch(
      (err:any) => console.log(err)
    );
    await updateProfile(auth.currentUser, { displayName: username }).catch(
      (err:any) => console.log(err)
    );
    //console.log(user);
  } catch (error: any) {
    //console.log("Error!", error);
    // Create and return Error object
    const errorObj: any = {
      code: 400,
      message: error.message,
    };
    //console.log(errorObj);
    return errorObj;
  }

  // Add user to the database where they can have further actions be done on them
  try {
    const response = await setDoc(doc(db, "Users", username), {
      name: username,
      state: "CA",
      country: "USA",
    });
    console.log(response)
  } catch (error) {
    console.log(error);
  }


  console.log("Registered!");
}

/**
 *
 * @param email
 * @param password
 * @returns 0 if success. Otherwise returns a object with error code and message
 */
export async function FirebaseLogin(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    //console.log(user);
  } catch (error: any) {
    //console.log("Error!", error);
    // Create and return Error object
    const errorObj: any = {
      code: 400,
      message: error.message,
    };
    //console.log(errorObj);
    return errorObj;
  }
  console.log("Signed in!");
}

export async function FirebaseLogout() {
  await signOut(auth);
  console.log("Logging out!");
}
