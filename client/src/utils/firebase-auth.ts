import { auth } from "../../firebase-config.ts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { Error } from "../types.ts";

export async function FirebaseRegister(email: string, password: string) {
  try {
    // Create user
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    // Update global state with user information

  } catch (error: any) {
    console.log("Error!", error);
    // Create and return Error object
    const errorObj: Error = {
      code: error.code,
      message: error.message,
    };
    return errorObj;
  }
  console.log("Registered!");
}

export async function FirebaseLogin(email: string, password: string) {
    try {
        // Create user
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        // Update global state with user information
    
      } catch (error: any) {
        console.log("Error!", error);
        // Create and return Error object
        const errorObj: Error = {
          code: error.code,
          message: error.message,
        };
        return errorObj;
      }
      console.log("Signed in!");
}

export async function FirebaseLogout() {
    await signOut(auth)
  console.log("Logging out!");
}
