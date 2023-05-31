import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

export default async function signOutUser() {
    await auth.signOut().then(() => {
        return true;
      }).catch((error) => {
        return error;
      });
}
