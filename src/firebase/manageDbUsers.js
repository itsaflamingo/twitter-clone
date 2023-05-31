import { db } from "./firebaseConfig";
import { getDocs, query, collection, setDoc } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

async function storeUsers(user) {
    await setDoc(doc(db, 'users', user.email), {
        user
    })
}

async function getUsers() {
    const docArr = [];
    const querySnapshot = await getDocs(query(collection(db, "users")));
    querySnapshot.forEach((doc) => {
      docArr.push(doc.data().user);
  });
    return docArr;
  }

async function deleteUserFromDb(email) {
  await deleteDoc(doc(db, 'users', email))
}

export { storeUsers, getUsers, deleteUserFromDb }