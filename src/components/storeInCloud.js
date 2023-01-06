import { app } from "./firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore"; 

const db = getFirestore(app);

async function storeUsers(user) {
    await setDoc(doc(db, 'users', user.email), {
        user
    })
}

async function storeTweets(tweet) {
    await setDoc(doc(db, 'tweets', tweet.id), {
        tweet,
    })
}

export { storeUsers, storeTweets }