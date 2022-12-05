import TweetInput from "./TweetInput";
import {selectUser} from './SignInPgSlice'
import { addTweet, tweetsSelector } from "./CreateTweetSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { getTweets } from "./retrieveFromCloud";
import { storeTweets } from "./storeInCloud";
import uniqid from 'uniqid'

export default function CreateTweet() {

    const tweets = useSelector(tweetsSelector);
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
        id: uniqid(),
        comments: []
    });

    useEffect(() => {
        console.log(input);
    }, [input]);

    const getDate = () => {
        let yourDate = new Date();
        const date = yourDate.toISOString().split('T')[0];
        const time = yourDate.toISOString().split('T')[1];
        
        return `${date} : ${time}`
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTweet({
            ...tweet, 
            text: input,
            date: getDate()
        })
        setInput('');
    }

    useEffect(() => {
        if(tweet.text === '') return;
        // When new tweet added, it is added to state tweets array
        dispatch(addTweet(tweet));
        console.log('tweet added');
        storeTweets(tweet);
        setTweet({
            ...tweet,
            text: '',
            date: ''
        })
    }, [tweet])

    useEffect(() => {
        // retrieve tweets from database, fires once
        getdbTweets();        
    }, [])

    const getdbTweets = async() => {
            let dbTweets;

            await getTweets().then((res) => dbTweets = res);
            dbTweets.forEach((tweet) => {
                // if tweet already exists in tweets, don't retrieve from database
                const isPresent = tweets.some(obj => obj.date === tweet.tweet.date)
                if (isPresent === true) return;
                // if above is false, retrieve from database
                dispatch(addTweet(tweet.tweet));
            })
        }

    return(
        <div id='create-tweet'>
            <TweetInput setInput={setInput} handleSubmit={handleSubmit} input={input} />
        </div>
    )
}