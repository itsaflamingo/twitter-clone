import { db } from "./firebaseConfig";
import { getDocs, query, collection, limit, setDoc } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

async function getTweets() {
    const querySnapshot = await getDocs(query(collection(db, 'tweets'), limit(40))); 
    const docArr = [];
    querySnapshot.forEach((doc) => {
        docArr.push(doc.data());
    })
    return docArr;
}

async function deleteTweetFromDb(id) {
  await deleteDoc(doc(db, "tweets", id));
}

async function storeTweets(tweet) {
    await setDoc(doc(db, 'tweets', tweet.id), {
        tweet,
    })
}

export { getTweets, deleteTweetFromDb, storeTweets }