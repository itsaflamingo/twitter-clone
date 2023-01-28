import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export default async function signOutUser() {
    await signOut(auth).then(() => {
        return true;
      }).catch((error) => {
        return error;
      });
}
