import { app } from "./firebaseConfig";
import { doc, getFirestore, getDocs, query, collection, getDoc, limit } from "firebase/firestore"; 

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
    const querySnapshot = await getDocs(query(collection(db, 'tweets'), limit(40))); 
    const docArr = [];
    querySnapshot.forEach((doc) => {
        docArr.push(doc.data())
    })
    return docArr;
}

export { getUsers, getTweets }