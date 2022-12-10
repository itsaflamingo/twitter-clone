import TweetInput from "./TweetInput";
import {selectUser} from './SignInPgSlice'
import { addTweet } from "./CreateTweetSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useReducer, useState } from "react";
import { getTweets } from "./retrieveFromCloud";
import { storeTweets } from "./storeInCloud";
import uniqid from 'uniqid'
import CreateTweetOptions from "./CreateTweetOptions";
import getDate from "./getDate";


export default function CreateTweet() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // Input hold the onChange handler for tweet. 
    const [input, setInput] = useState('');
    // When submit button clicked, input gets placed in tweet.
    const [tweet, setTweet] = useState({
        name: user.displayName,
        date: '',
        text: '',
        image: '',
        likes: 0,
        retweets: 0,
        words: 0,
        comments: []
    });

    const [usedId, dispatchUsedId] = useReducer(addToUsedId, { state: [] });

    const handleSubmit = (e) => {
        e.preventDefault();
        setTweet({
            ...tweet, 
            text: input,
            date: getDate(),
            id: uniqid()
        })
        setInput('');
    }

    useEffect(() => {
        if(tweet.text === '') return;
        // When new tweet added, it is added to state tweets array
        dispatch(addTweet(tweet));
        storeTweets(tweet);
        setTweet({
            ...tweet,
            text: '',
            date: ''
        })
    }, [tweet])

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
        <div id='create-tweet'>
            <TweetInput setInput={setInput} input={input} />
            <div id='tweet-add-ons'>
                <CreateTweetOptions handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

function addToUsedId(state, action) {
    switch(action.type) {
        case 'add tweet': 
        return {
            state: [...state.state, action.value]
        };
        default: return;
    }
}