import { app } from "./firebaseConfig";
import { getFirestore, getDocs, query, collection, limit } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

async function getUsers() {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    const docArr = [];
    querySnapshot.forEach((doc) => {
    docArr.push(doc.data().user);
  });
    return docArr;
  }

async function getTweets() {
    const querySnapshot = await getDocs(query(collection(db, 'tweets'), limit(40))); 
    const docArr = [];
    querySnapshot.forEach((doc) => {
        docArr.push(doc.data());
    })
    return docArr;
}

async function deleteTweet(id) {
  await deleteDoc(doc(db, "tweets", id));
}

async function deleteUserFromDb(email) {
  await deleteDoc(doc(db, 'users', email))
}

export { getUsers, getTweets, deleteTweet, deleteUserFromDb }