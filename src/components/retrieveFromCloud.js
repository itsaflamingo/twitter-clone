import { app } from "./firebaseConfig";
import { doc, getFirestore, getDocs, query, collection, getDoc } from "firebase/firestore"; 

const db = getFirestore(app);

async function getUsers() {
    const querySnapshot = await getDocs(query(collection(db, "users")));
    const docArr = [];
    querySnapshot.forEach((doc) => {
    docArr.push(doc.data());
  });
    return docArr;
  }

async function getTweets() {
    const querySnapshot = await getDocs(query(collection(db, 'tweets')));
    const docArr = [];
    querySnapshot.forEach((doc) => {
        docArr.push(doc.data)
    })
    return docArr;
}

export { getUsers, getTweets }