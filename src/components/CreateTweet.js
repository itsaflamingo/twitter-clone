import TweetInput from "./TweetInput";
import {selectUser} from './SignInPgSlice'
import { addTweet, tweetsSelector } from "./CreateTweetSlice";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { getTweets } from "./retrieveFromCloud";
import { storeTweets } from "./storeInCloud";

export default function CreateTweet() {

    const tweets = useSelector(tweetsSelector);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [tweet, setTweet] = useState({
        name: user.displayName,
        date: '',
        text: '',
        image: '',
        likes: 0,
        retweets: 0,
        words: 0,
        id: 0,
    })

    const getDate = () => {
        let yourDate = new Date();
        const date = yourDate.toISOString().split('T')[0];
        const time = yourDate.toISOString().split('T')[1];
        
        return `${date} : ${time}`
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setTweet({
            ...tweet, 
            text: input,
            date: getDate()
        })
        setInput('');
    }

    useEffect(() => {
        if(tweet.text === '') return;
        dispatch(addTweet(tweet));
        storeTweets(tweet);
    }, [tweet])

    useEffect(() => {
        // retrieve tweets from database
        const getdbTweets = async() => {
            let dbTweets;
            await getTweets().then((res) => dbTweets = res);
            dispatch(addTweet(dbTweets));
        }
        getdbTweets();        
    }, [])

    return(
        <div id='create-tweet'>
            <TweetInput setInput={setInput} />
            <button 
            type='submit'
            onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}