import { app } from "./firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 

const db = getFirestore(app);

async function storeUsers(obj) {
    await setDoc(doc(db, 'users', obj.displayName), {
        user: obj
    })
}

async function storeTweets(tweet) {
    await setDoc(doc(db, 'tweets', tweet.name), {
        tweet,
    })
}

export { storeUsers, storeTweets }