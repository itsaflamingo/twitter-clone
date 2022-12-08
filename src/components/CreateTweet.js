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
        comments: []
    });

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

    useEffect(() => {
        let ignore = false;
        
        const getdbTweets = async() => {
            let usedId = [];        
            const json = await getTweets();
            if(!ignore) {
                addNewTweetToDatabase(json, usedId);
            }
        }

        getdbTweets();

        return() => {
            ignore = true;
        }
    }, [])

        function addNewTweetToDatabase(res, usedId) {
            res.forEach((tweet) => {
                // if tweet already exists in tweets, don't retrieve from database
                const isPresent = usedId.filter(id => {
                    console.log(id, tweet.tweet.id)
                    return id === tweet.tweet.id
                });
                
                if(!usedId.includes(tweet.tweet.id)) usedId.push(tweet.tweet.id);

                console.log(isPresent)
                if (isPresent.length > 0) return;
                // if above is false, retrieve from database.
                dispatch(addTweet(tweet.tweet));
        })}

    return(
        <div id='create-tweet'>
            <TweetInput setInput={setInput} input={input} />
            <div id='tweet-add-ons'>
            <button 
                type='submit'
                onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
        </div>
    )
}