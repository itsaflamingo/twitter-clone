import { app } from "./firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 

const db = getFirestore(app);

async function storeUsers(user) {
    await setDoc(doc(db, 'users', user.displayName), {
        user
    })
}

async function storeTweets(tweet) {
    await setDoc(doc(db, 'tweets', tweet.date), {
        tweet,
    })
}

export { storeUsers, storeTweets }