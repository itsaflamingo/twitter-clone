import AddMenuAndAside from "./AddMenuAndAside";
import CreateTweet from './CreateTweet'
import DisplayTweets from "./DisplayTweets";
import { useState, useEffect, useReducer } from "react";
import { tweetsSelector } from "./CreateTweetSlice";
import { useSelector, useDispatch } from "react-redux";
import addToSetTweets from "./addToSetTweets";
import { getTweets } from "./retrieveFromCloud";
import { addTweet } from "./CreateTweetSlice";

function Dashboard() {

    const tweets = useSelector(tweetsSelector);
    const [showTweets, setShowTweets] = useState(true);
    const dispatch = useDispatch();
    const [usedId, dispatchUsedId] = useReducer(addToSetTweets, { state: [] });

    useState(() => {
        if(tweets.length === 0) return;
        setShowTweets(true);
    }, [tweets])

    // Will run more than once because there is a closure inside the callback function.
    useEffect(() => {
        let ignore = false;
        
        const getdbTweets = async() => {
            const json = await getTweets();
            if(!ignore) {
                retrieveTweetsFromDatabase(json, usedId);
            }
        }

        getdbTweets();

        return() => {
            ignore = true;
        }
    }, [])

    function retrieveTweetsFromDatabase(res, usedId) {
        res.forEach((tweet) => {
            // check if tweet already exists.
            const isPresent = usedId.state.includes(tweet.tweet.id);
            // if tweet exists don't add to database. 
            if (isPresent === true) return;
            // else add to database, & to included tweets.
            dispatchUsedId({ type: 'add tweet', value: tweet.tweet.id });
            dispatch(addTweet(tweet.tweet));
    })}

    return(
        <div id='dashboard'>
            <div id='header'>
                <h2>Home</h2>
            </div>
            <CreateTweet retweet={[]} showRetweet={null} />
            {showTweets && (<DisplayTweets />)}
        </div>
    )
}

export default AddMenuAndAside(Dashboard);

