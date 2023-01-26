import { db } from "./firebaseConfig";
import { getDocs, query, collection, limit } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

async function getUsers() {
    const docArr = [];
    await getDocs(query(collection(db, "users")))
    .then(res => res.forEach((doc) => {
      docArr.push(doc.data().user)
    .catch(error => console.log(error))
  }));
    ;
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