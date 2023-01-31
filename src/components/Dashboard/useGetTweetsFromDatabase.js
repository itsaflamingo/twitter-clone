import { useReducer, useEffect } from "react";
import { getTweets } from "../retrieveFromCloud";
import { useDispatch, useSelector } from "react-redux";
import { addTweet, tweetsSelector } from "./createTweetSlice";
import { tweetIdsSelector, storeTweetId } from "./storeTweetIdSlice";


export default function useGetTweetsFromDatabase() {
    
    const tweets = useSelector(tweetsSelector);
    const storedTweets = useSelector(tweetIdsSelector);
    const dispatch = useDispatch();

        // Will run more than once because there is a closure inside the callback function. Ignore variable ensures it runs only once.
        useEffect(() => {
            if(tweets.length > 0) return;
            let ignore = false;
            
            const getdbTweets = async() => {
                const json = await getTweets();
                if(!ignore) {
                    retrieveTweetsFromDatabase(json, storedTweets);
                }
            }
    
            getdbTweets();
    
            return() => {
                ignore = true;
            }
        }, [])

        function retrieveTweetsFromDatabase(res, storedTweets) {
            res.forEach((tweet) => {
                // check if tweet already exists.
                const isPresent = storedTweets.includes(tweet.tweet.id);
                // if tweet exists don't add to database. 
                if(isPresent === true) return;
                // else add to database, & to included tweets.
                dispatch(storeTweetId(tweet.tweet.id));
                dispatch(addTweet(tweet.tweet));
        })}

    return storedTweets;
}